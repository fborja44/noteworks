/* Main App Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Component imports
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import HomeContent from "./components/home/HomeContent";
import QuicknotesContent from "./components/quicknotes/QuicknotesContent";
import MarknotesContent from "./components/marknotes/MarknotesContent";
import SettingsContent from "./components/settings/SettingsContent";

// CSS imports
import "./css/app.css";
import "./css/quicknotes.css";
import "./css/marknotes.css";

/**
 * Main application component
 */
const App = () => {
  /* Marknotes state hook and methods
  ------------------------------------------------------------------------------*/
  // TODO: Move marknotes hooks and methods to MarknotesContent
  return (
    <div className="App">
      <Header />
      <Router>
        <div className="app-container">
          <Sidebar />
          <Switch>
            <Route exact path="/">
              <main>
                <HomeContent />
              </main>
            </Route>
            <Route path="/quicknotes">
              <main>
                <QuicknotesContent />
              </main>
            </Route>
            <Route path="/marknotes">
              <main>
                <MarknotesContent />
              </main>
            </Route>
            <Route path="/settings">
              <main>
                <SettingsContent />
              </main>
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
