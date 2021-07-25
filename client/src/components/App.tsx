/* Main App Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Component imports
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import HomeContent from "./home/HomeContent";
import QuicknotesContent from "./quicknotes/QuicknotesContent";
import MarknotesContent from "./marknotes/MarknotesContent";
import SettingsContent from "./settings/SettingsContent";

// CSS imports
import "../css/app.css";
import "../css/quicknotes.css";
import "../css/marknotes.css";

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
