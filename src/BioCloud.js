/*jshint strict:true, unused:true, bitwise:true, camelcase:true, curly:true, eqeqeq:true, freeze:true, undef:true*/
'use strict';

var Twit = require('twit');

const settings = require('env-smart').load({ lowercase: true });

var totalBios,
	groupCount,
	friends,
	username,
	wordCountMinimum,
	wordsToIgnore=require('./ignore_words.js');

const { consumer_key, consumer_secret, access_token, access_token_secret } = settings;

if (consumer_key === '' || consumer_secret === '' || access_token === '' || access_token_secret === '') {
	throw new Error('Environment variables missing Twitter developer credentials. Please populate CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, and ACCESS_TOKEN_SECRET environment variables in an .env file.');
}

var T = new Twit ( {
	consumer_key, 
	consumer_secret,
	access_token,
	access_token_secret
});

exports.getWordCount = function getWordCount(user, minimum, callback) {

	totalBios = [];

	groupCount = 0;

	friends = null;

	username = user;

	wordCountMinimum = minimum;


	T.get('friends/ids', { screen_name: username }, function(err, data, response) {

		if (err) {

			console.log('Error getting friends for user. ' + err);

			callback(err, null);

			return;
		}

		var ids=data['ids'];

		splitUsersIntoGroups(ids, callback);
	});
}

function splitUsersIntoGroups(users, callback){

	//Split users into arrays of a hundred
	var usersGrouped=[],

		bioGroup=[];

	for(var userIndex = 0; userIndex < users.length; userIndex++) {

		if (userIndex === 0 || userIndex % 100 === 0) {
			usersGrouped.push([]);
		}

		usersGrouped[usersGrouped.length - 1].push(users[userIndex]);
	}

	for (var groupIndex=0; groupIndex < usersGrouped.length; groupIndex++) {
		usersLookup(usersGrouped[groupIndex], usersGrouped.length, callback);
	}
}

function usersLookup(userGroup, totalGroupCount, callback) {

	T.post('users/lookup', { user_id : userGroup.join()  }, function(err, data, response) {

		if(err) {

			console.log(err);

			callback(err, null);

			return;
		}

		var friendBiosForGroup = data;

		var bioGroup = [];

		for(var i = 0; i < friendBiosForGroup.length; i++) {

			var description = friendBiosForGroup[i]['description'];

			bioGroup.push(description);
		}

		getUserBioAggregate(bioGroup, totalGroupCount, callback);
	});
}

function getUserBioAggregate(biosGroup, totalGroupCount, callback) {

	totalBios=totalBios.concat(biosGroup);

	groupCount++;

	if (groupCount === totalGroupCount) {

		var wordCount = generateWordCloud(totalBios);

		callback(null, wordCount);
	}
}

function generateWordCloud (totalBios) {

	var wordCount = {},
		wordsWithLittleOccurence = [];

	for(var bioIndex = 0; bioIndex < totalBios.length; bioIndex++) {

		var currentBio = totalBios[bioIndex].replace(/[^\w\s]/gi, '').toLowerCase();

		var words = currentBio.split(' ');

		for(var wordIndex = 0; wordIndex < words.length; wordIndex++) {

			var currentWord = words[wordIndex];

			if (currentWord === '' || wordsToIgnore.indexOf(currentWord) > -1) {
				continue;
			}

			if (wordCount.hasOwnProperty(currentWord)) {
				wordCount[currentWord]++;
			}
			else {
				wordCount[currentWord] = 1;
			}
		}
	}

	if (wordCountMinimum > 0) {

		for(var key in wordCount) {
			if(wordCount[key] < wordCountMinimum) {
				wordsWithLittleOccurence.push(key);
			}
		}

		for(var i = 0; i < wordsWithLittleOccurence.length; i++){
			delete wordCount[wordsWithLittleOccurence[i]];
		}
	}

	// Create items array
	var items = Object.keys(wordCount).map(function(key) {
		return [key, wordCount[key]];
	});

	// Sort the array based on the second element
	items.sort(function(first, second) {
		return second[1] - first[1];
	});

	return items;
}
