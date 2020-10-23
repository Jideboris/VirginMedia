const needle = require('needle');
const path = require("path");
const keys = require(path.join(__dirname, "/config/keys"))

//BEARER TOKEN retrieved from ENV
const token = keys.BEARER_TOKEN;
// Tweeter API end point
const endpointUrl = 'https://api.twitter.com/2/tweets/search/recent'

async function getTweetsRequest() {
  // Supported query parameters below
  const params = {
    'query': 'twitterdev'
  }

  const tweets = await needle('get', endpointUrl, params, {
    headers: {
      "authorization": `Bearer ${token}`
    }
  })

  if (tweets.body) {
    return tweets.body;
  } else {
    throw new Error('Unsuccessful request')
  }
}

async function getTweets(req, res) {
  try {
    // make a call to function to pull down data from Tweeter API
    const response = await getTweetsRequest();
    return res.send(response)

  } catch (e) {}
  //stop processing once call completed to prevent memory loss
  process.exit();
}

// Make the module accessible externally
module.exports = {
  getTweets: getTweets,
};
