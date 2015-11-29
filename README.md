# twitter_hoover
A super vacuum for getting all the messages from twitter w/ a given keyword

# Informations
*twitter_hoover* is my personal vacuum to get tons of tweets with a given keyword. Isn't its name clever? (*no? ok then...*)

## How do I use it?
Well, for now, the soft isn't fully functional. It's still in development. But **you can use it**, isn't it beautiful?

So....

### What does it do for now?
For now, you can store your search on many files (since the Twitter API allows 100 results max by search, you can grab only... yup, you're god damn right, 100 tweets by file). But you will be able soon to store a lot of more stuff in less files (if I'm courageous enough). Yeepee.

Well, in fact maybe not. But I just added `group_tweets.js` that keeps all files and concatenate tweets in one var. For now.

### What do I have to do?
After the installation (please see **Installation** for more informations about... the installation), you'll have to set your search parameters to the wanted ones.

You only have to edit `twitter_hoover.js` at the following variables:

```javascript
var maxCount = 100; // Set here the number of tweets you want, careful, max value allowed by Twitter API is 100
var query = 'Yolo'; // In case you want to search tweets containing 'yolo', everybody wants to do this, don't lie to yourself
```

Then, you can run the file with `node twitter_hoover.js`. All the tweets will be written in a file at `./tweets/tweets_123456789.json` or whatever the number will be.

After that, if you want to concatenate all the tweets, you can run `node group_tweets.js`, but it only saves the result in a JSON file for now, so I'm not convinced of the interest. Maybe that's because **the soft isn't fully functionnable!** (but don't worry, it will be fixed soon, for now I'll just gonna play *Fallout*, the first one, GoG rulz).

#### BE CAREFUL!
Don't ever change this to a smaller value:
```javascript
setInterval (function() {
    // ...
}, (5*1000));
```
If you don't want Twitter to ban your user account, one request every 5 seconds is the highest value you can have.

# Installation

- Run `npm install` for installing dependencies.
- Create a file named `constants.js` with the following content and place it to the root folder:

```javascript
var CONSTANTS = {
    'consumer_key': 'YOUR_TWITTER_CONSUMER_KEY',
    'consumer_secret':'YOUR_TWITTER_CONSUMER_SECRET',
    'access_token':'YOUR_TWITTER_ACCESS_TOKEN',
    'access_token_secret':'YOUR_TWITTER_TOKEN_SECRET',
};

module.exports.CONSTANTS = CONSTANTS;
```
Pretty easy right? Now, go play and have fun with this almighty soft, I'll just fly away.

*flies away*
