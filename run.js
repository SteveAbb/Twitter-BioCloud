/*jshint strict:true, unused:true, bitwise:true, camelcase:true, curly:true, eqeqeq:true, freeze:true, undef:true*/
'use strict';

var fs = require('fs'),
	http = require('http'),
	mime = require('mime'),
	path = require('path'),
	url = require('url'),
	bioCloud = require('./BioCloud.js'),
	sampleData = require('./sample.json');

var settings = {
	"port": 8000,
	"directory": "web",
	"debug": 1
};

var server = http.createServer(function (request, response) {

	var pathname = url.parse(request.url).pathname;

	var getParams = url.parse(request.url, true).query;

	if ('user' in getParams) {

		if (settings.debug) {
			
			response.writeHead(200, {
				"Content-Type": "application/json"
			});
			
			response.write(JSON.stringify(sampleData));
			
			response.end();
			
			return;
		}

		bioCloud.getWordCount(getParams['user'], 0, function (error, wordCountResult) {

			if (!error) {
				
				response.writeHead(200, {
					"Content-Type": "application/json"
				});
				
				response.write(JSON.stringify(wordCountResult));
				
				response.end();
				
				return;
			} else {
				
				response.writeHead(500);
				
				response.end();
			}
		});
	} else {

		var filename = path.join(process.cwd(), settings.directory, pathname);

		if (!path.extname(filename)) {
			filename = filename + '/index.html';
		}

		fs.exists(filename, function (hasPath) {

			if (!hasPath) {
				
				response.writeHead(404, {
					"Content-Type": "text/plain"
				});
				
				response.write("404 Not Found");
				
				response.end();
				
				return;
			}

			response.writeHead(200, {
				'Content-Type': mime.lookup(filename)
			});

			fs.createReadStream(filename, {
				'flags': 'r',
				'encoding': 'binary',
				'mode': '0666',
				'bufferSize': 4 * 1024
			}).addListener("data", function (chunk) {
				response.write(chunk, 'binary');
			}).addListener("close", function () {
				response.end();
			});
		});
	}
});

console.log('Server started on port: ' + settings.port);

server.listen(settings.port);