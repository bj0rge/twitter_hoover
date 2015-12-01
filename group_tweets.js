var Twit = require('twit')
var Const = require('./constants');
var fs = require('fs');


/* ##########
 * The values you have to edit
 * ##########
 */
var exportType = 'csv';


/*
 * Compares two strings to know if it starts by a given prefix
 * @params      string      str     wanted string to compare
 *              string      prefix  start of the string we want to compare
 * @return      boolean     true if str starts by prefix
 */
function stringStartsWith (str, prefix) {
    return str.slice(0, prefix.length) == prefix;
}


/*
 * Encode a given string into a wanted format, used for parsing into a csv file
 * @params  string  str     String to convert
 * @return  string          Formated string
 */
function strFormat(str) {
    return '"' + str.replace(/\n/g, ' ').replace(/"/g, '""') + '"';
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

console.log("Writing the file, it may takes a few minutes if there are many tweets.");


var text;
var outputFilename;

if (exportType == 'csv') {
    outputFilename = dirName + '/grouped_tweets.csv';
    text = "\ufeffCreated at;Name;Username;Text";

    tweets.forEach(function(tweet){
         text += "\n" + strFormat(tweet.created_at)
            + ";" + strFormat(tweet.user.name)
            + ";" + strFormat('@' + tweet.user.screen_name)
            + ";" + strFormat(tweet.text);
    });
}
else {
    outputFilename = dirName + '/grouped_tweets.json';
    text = JSON.stringify(tweets, null, 4);
}

// Writing formated object in a file
fs.writeFile(outputFilename, text, function(err) {
    if(err) console.log(err);
    else console.log("file saved to " + outputFilename);
});
