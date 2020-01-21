'use strict';

// Parse each line of ../ignore_words.txt into an array, and set module.exports to that
// Set it to an empty array otherwise

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../ignore_words.txt');

let contents;

try {
  contents = fs.readFileSync(filePath);
} catch (error) {
  console.error(`ERROR: Could not load "ignore_words.txt"`);
}

if (contents) {

  const lines = contents.toString()
    .split('\n')
    .map(line => line.trim().toLowerCase())
    .filter(line => line !== '');

  module.exports = lines;

} else {
  module.exports = [];
}
