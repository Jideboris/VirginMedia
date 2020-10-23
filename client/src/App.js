import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Router>
          <div >
            <Switch>
              <Route exact path="/" render={props =>
                <Login
                  {...props}

                />} />
              <Route
                path="/home"
                component={props => (
                  <Home
                    {...props}
                  />
                )}
              />
            </Switch>
          </div>
        </Router>

      </div>

    );
  }
}

export default App;
