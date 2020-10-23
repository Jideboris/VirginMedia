import "./assets/css/main.css";
import "./assets/sass/main.scss"
import App from "../src/App";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import * as serviceWorker from "./serviceWorker";
import React from "react";
import ReactDOM from "react-dom";

const history = createBrowserHistory();
ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
