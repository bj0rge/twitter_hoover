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
// Tweets will be stored in this variable
var tweets;
var files = fs.readdirSync(dirName);
// This variable will only be used to give informations about the number of files remaining
var i = 0;

// For each filename
files.forEach(function(fileName){
    i++;
    // Only on certain files
    if (stringStartsWith(fileName, 'tweets_')){
        // Reading the file
        var text = fs.readFileSync(dirName + '/' + fileName);
        // Parsing the text in a JSON
        var tmpTweets = JSON.parse(text);
        // Concatenating the tweets
        tweets = (typeof tweets == 'undefined') ? tmpTweets : tweets.concat(tmpTweets);
        console.log(fileName + " is read (" + i + "/" + files.length + ")");
    }
});

console.log("I got " + tweets.length + " tweets, wow!");

console.log("Writing the file, it may takes a few minutes if there are many tweets.")
var outputFilename = dirName + '/grouped_tweets.json';
// Writing formated object in a file
fs.writeFile(outputFilename, JSON.stringify(tweets, null, 4), function(err) {
    if(err) console.log(err);
    else console.log("json saved to " + outputFilename);
});
