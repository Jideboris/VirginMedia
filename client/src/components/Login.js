import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import Button from "@material-ui/core/Button";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }
    this.signIn = this.signIn.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
  }

  keyPressed(event) {
    if (event.key === "Enter") {
      this.signIn(event);
    }
  }

  async signIn() {
    this.setState({ authenticated: true })
    window.open("/login/twitter", "_self");
  }
  

  render() {
    return (
      <ErrorBoundary>
        <div className="content">
          <Button
            variant="contained"
            onClick={this.signIn}
          >
            Sign Up / Login with Twitter
            </Button>
        </div>
      </ErrorBoundary>
    );
  }
}
