const express = require("express");
const path = require("path");
const http = require("http");
const cors = require('cors')

const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;

// These declarations below are to be used to dockerize the application
// const keys = require(path.join(__dirname, "config/keys"));
// const User = require(path.join(__dirname, "model/user"));
// const {getTweets} = require(path.join(__dirname, "services"));

// These declarations below are to be used to run application locally from a terminal
const keys = require("./server/config/keys");
const User = require("./server/model/user");
const { getTweets } = require("./server/services");

const app = express();
const server = http.createServer(app);

const CLIENT_HOME_PAGE_URL = "http://localhost:8080/home";

// Configured Twitter strategy for use by Passport.
passport.use(new Strategy({
  consumerKey: keys.TWITTER_CONSUMER_KEY,
  consumerSecret: keys.TWITTER_CONSUMER_SECRET,
  callbackURL: 'http://localhost:8080/twitter/redirect',
},
  async (token, tokenSecret, profile, done) => {
    // this lookup current user in UserModel
    const currentUser = await User.findOne({
      twitterId: profile._json.id_str
    });
    // if user does not exist make a new user
    if (!currentUser) {
      const newUser = await new User({
        name: profile._json.name,
        screenName: profile._json.screen_name,
        twitterId: profile._json.id_str,
        profileImageUrl: profile._json.profile_image_url
      }).save();
      if (newUser) {
        done(null, newUser);
      }
    }
    done(null, currentUser);
  }
)
)
// Needed to serializer user model from the database created to store authenticated user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Needed to deserializeUser user model from the database created to store authenticated user
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(e => {
      done(new Error("Failed to deserialize an user"));
    });
});


// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "http://localhost:8080", //this should use domain url if this is to be published to a server
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

app.use(require('express-session')({ secret: "Virgin-Media-test", resave: true, saveUninitialized: true }));

// Used to initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Serve the static files from the React app,below is to be used in order to dockerize the app
//app.use(express.static(path.join(__dirname, "../client/build")));

// Serve the static files from the React app,below is to be used in order to run via a terminal command and to unit test
app.use(express.static(path.join(__dirname, "client/build")));

//endpoint on button click from the UI to authenticate users
app.get('/login/twitter', passport.authenticate('twitter'));

// Once a user is authenticated it redirects to home page via twitter
app.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/login/failed"
  })
);

// when login failed, message will be communicate to UI as tested
app.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

// it fetches current DEV tweets on mounting home component in UI
app.get("/api/gettweets", getTweets)

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  // below in order to dockerize the app
  // res.sendFile(path.join(__dirname, "../client/build/index.html"));

  //below if to be run from terminal commands
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 8080;

module.exports = server.listen(port, err => {
  if (err) throw err;
  console.log("listening on port 8080");
});
