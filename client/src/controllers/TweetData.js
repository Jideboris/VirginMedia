const axios = require("axios");

//Make to Tweet API to get the current Tweets
export async function getTweets() {
    try {
      return await axios.get(`/api/gettweets`);
    } catch (e) {
      throw e;
    }
  }