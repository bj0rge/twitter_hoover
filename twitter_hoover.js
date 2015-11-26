var Twit = require('twit')
var Const = require('./constants');


var T = new Twit({
    consumer_key:         Const.CONSTANTS['consumer_key']
  , consumer_secret:      Const.CONSTANTS['consumer_secret']
  , access_token:         Const.CONSTANTS['access_token']
  , access_token_secret:  Const.CONSTANTS['access_token_secret']
})


T.get('search/tweets', { q: '#DPDA', count: 100  }, function(err, data, response) {
    console.log(data);
})
