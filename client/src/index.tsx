// React imports
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";

// Component imports
import App from "./components/App";

// CSS imports
import "./css/index.css";
import "./css/app.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
