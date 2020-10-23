This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Objectives are below:
 oAuth authentication strategy for authenticating user using twitter
 1. This was implemented by registering a developer account with Tweeter,hence was approved and provided with all the KEYS required to do this.
 2. The KEYS are not made available publicly but rather consumed from ENV and also added to Dockfile in order to dockerized the application although not obfuscated.
 3. User click a button to log in,consequently a call is made to '/login/twitter' and 
 a passport.use(new Strategy() is enabled.
 4. passport.use(new Strategy() first check if a user already existed on its database else it creates a collection on MongoDB and save in the user.If all is succesful it redirects to '/twitter/redirect' and subsequently to UI home page.

 Implement Twitter’s REST API twitter to fetch latest tweets
 1. After a user is authenticated as completed above, the application navigates the user to HOME page and on mounting the component, it makes a call the tweeter rest API to pull and returns latest TweetDEV. https://api.twitter.com/2/tweets/search/recent

 Display response from above API in a simple interface. We are expecting some interactions with UI such as filtering or sorting by dates.
 1.  Having completed the above, the response from the call to the rest API is loaded on a table by using simple React Material UI and it is done in such as a way that the data could be filtered,sorted,edited and also deleted.Please note that this exercise is not extended to updating the model on editing and deleting but all provision made ready.

 Store/ log all authentications and API requests in RDMS database (preferably mysql / mongo)
 1. Done as explained above.

 These features must be extendable / reusable so that in future we can reuse these code to support other social media applications
 1. Extendability of the code is put into consideration by using MVC and by separating 'Client' from 'Server'

 If possible, you can Dockerize this project
 The application was dockerized and can be run locally in  docker container by follwing the steps below.
1. Clone Dockfile from git repo must be replace by the one included in this email because of the KEYS that I do not want to expose. Ensure the file is in the folder root directory.
2. Replace line 94 of index file with 
    app.use(express.static(path.join(__dirname, "../client/build")));
3. Replace line 17,18,19 on index file with the following respectively
      const keys = require(path.join(__dirname, "config/keys"));
      const User = require(path.join(__dirname, "model/user"));
      const {getTweets} = require(path.join(__dirname, "services"));
4. And finally replace line 125 with
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
5. Please note the port is hardwoded to 8080 that should be in running the following command to dockerize the app 
STEPS TO DOCKERIZE:    
1. Create docker image for the app from its directory.In used the name--virgin-media-test.Please do not ignore the dot(.)
       docker build -t virgin-media-test .
2. Create runnming container of the image
    docker run -d -p  8080:8080 --name virgin-media virgin-media-test
3. You may check if the container is running by using
         docker ps -a
4. Check the log to double the PORT at which it is running
        docker container logs virgin-media.If all good you see the PORT 8080
5. Open a browser and run on http://localhost:8080 to see the app.
       
If possible, you can use a frontend technology such as Angular or React for your UI. 
 1. Demo done using React,unit tested by using JEST and ENZYME and an endpoint /login/failed  on the server.

In order to run this porject outside dcoker please follow the steps below.First ensure you on the app directory.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.
Ensure nothing is running on this PORT 8080.You may stop your docker if already running by using: docker stop virgin-media

RUN CLIENT(REACT-UI)
1. Open a terminal for client
2. cd client
3. npm i
4. npm run build-dev and to test -- npm run test


RUN SERVER (NODE)
1. Open another terminal or tab
2. cd server
3. npm i
4. npm start and to test --npm test.

URL to this repository in the eamil with DockerFile replace in case you want to run using docker.

Thank you.


