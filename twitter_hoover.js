var Twit = require('twit')
var Const = require('./constants');
var fs = require('fs');


var T = new Twit({
    consumer_key:         Const.CONSTANTS['consumer_key']
  , consumer_secret:      Const.CONSTANTS['consumer_secret']
  , access_token:         Const.CONSTANTS['access_token']
  , access_token_secret:  Const.CONSTANTS['access_token_secret']
})

/* ##########
 * The values you have to edit
 * ##########
 */
var maxCount = 100; // Max value allowed by Twitter API is 100
var query = '#DPDA';



/*
 * Save a bunch of tweets in a file
 * @params      data    JSON object     object returned by the Twit search
 * @return      int                     the id of the oldest tweet collected
 */
function saveTweets(data) {
    var tweets = data.statuses;
    var firstId = tweets[maxCount - 1].id; // because tweets start with the most recent
    var outputFilename = './tweets/tweets_'+ firstId +'.json';

    // Writing formated object in a file
    fs.writeFile(outputFilename, JSON.stringify(tweets, null, 4), function(err) {
        if(err) console.log(err);
        else console.log("json saved to " + outputFilename);
    });
    return firstId;
}



// Starting w/ firstId at 0 in order to do the first search
firstId = 0;
nbTweets = 0;


console.log("Starting recording");

do {
    // Every 5s
    setInterval (function() {
        if (firstId == 0) {
            T.get('search/tweets', { q: query, count: maxCount }, function(err, data, response) {
                firstId = saveTweets(data);
                nbTweets = data.statuses.length;
                if (nbTweets != maxCount) console.log("All tweets recorded!");
            });
        }
        else {
            T.get('search/tweets', { q: query, count: maxCount, max_id: firstId }, function(err, data, response) {
                firstId = saveTweets(data);
                nbTweets = data.statuses.length;
                if (nbTweets != maxCount) console.log("All tweets recorded!");
            });
        }
    }, (5*1000));
}
while (nbTweets == maxCount);

return true;
