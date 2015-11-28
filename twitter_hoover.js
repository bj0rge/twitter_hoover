var Twit = require('twit')
var Const = require('./constants');
var fs = require('fs');


var T = new Twit({
    consumer_key:         Const.CONSTANTS['consumer_key']
  , consumer_secret:      Const.CONSTANTS['consumer_secret']
  , access_token:         Const.CONSTANTS['access_token']
  , access_token_secret:  Const.CONSTANTS['access_token_secret']
})


var maxCount = 100; // Max value allowed by Twitter API is 100
var query = '#DPDA';




function saveTweets(data) {
    var tweets = data.statuses;
    var firstId = tweets[maxCount - 1].id; // because tweets start with the most recent
    var outputFilename = './tweets/tweets_'+ firstId +'.json';


    fs.writeFile(outputFilename, JSON.stringify(tweets, null, 4), function(err) {
        if(err) console.log(err);
        else console.log("json saved to " + outputFilename);
    });
}

T.get('search/tweets', { q: query, count: maxCount }, function(err, data, response) {
    saveTweets(data);
})
