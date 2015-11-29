var Twit = require('twit')
var Const = require('./constants');
var fs = require('fs');

/*
 * Compares two strings to know if it starts by a given prefix
 * @params      string      str     wanted string to compare
 *              string      prefix  start of the string we want to compare
 * @return      boolean     true if str starts by prefix
 */
function stringStartsWith (str, prefix) {
    return str.slice(0, prefix.length) == prefix;
}


// All the files are in this directory
var dirName = './tweets';
var tweets;
var files = fs.readdirSync(dirName);
var i = 0;

// For each filename
files.forEach(function(fileName){
    i++;
    // Only on certain files
    if (stringStartsWith(fileName, 'tweets_')){
        var text = fs.readFileSync(dirName + '/' + fileName);
        var tmpTweets = JSON.parse(text);
        tweets = (typeof tweets == 'undefined') ? tmpTweets : tweets.concat(tmpTweets);
        console.log(fileName + " is read (" + i + "/" + files.length + ")");
    }
});

console.log("I got " + tweets.length + " tweets, wow!");
