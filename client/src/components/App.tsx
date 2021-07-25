/* Main App Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Common imports
import { Quicknote, Marknote } from "../common/types";

// Component imports
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import HomeContent from "./home/HomeContent";
import QNContent from "./quicknotes/QNContent";
import MNContent from "./marknotes/MNContent";
import SettingsContent from "./settings/SettingsContent";

// CSS imports
import "../css/app.css";
import "../css/quicknotes.css";
import "../css/marknotes.css";

/**
 * Main application component
 */
const App = () => {
  /* Quicknotes State
  ------------------------------------------------------------------------------*/
  const [quicknotes, setQuicknotes] = useState<Quicknote[]>([]);
  const quicknotesLocal = "denote_quicknotes";

  /**
   * Effect hook to retrieve quicknotes from local storage
   */
  useEffect(() => {
    const savedQuicknotes = JSON.parse(
      localStorage.getItem(quicknotesLocal) || "{}"
    );
    // Check if notes were received
    if (savedQuicknotes) {
      setQuicknotes(savedQuicknotes);
    }
  }, []); // Run on load

  /**
   * Effect hook to save quicknotes to local storage when change is made
   */
  useEffect(() => {
    localStorage.setItem(quicknotesLocal, JSON.stringify(quicknotes));
  }, [quicknotes]); // Run on change in notes

  /* Marknote State
  ------------------------------------------------------------------------------*/
  const [marknotes, setMarknotes] = useState<Marknote[]>([]);
  const marknotesLocal = "denote_marknotes";

  /**
   * Effect hook to retrieve marknotes from local storage
   */
  useEffect(() => {
    const savedMarknotes = JSON.parse(
      localStorage.getItem(marknotesLocal) || "{}"
    );
    // Check if notes were received
    if (savedMarknotes) {
      setMarknotes(savedMarknotes);
    }
  }, []); // Run on load

  /**
   * Effect hook to save marknotes to local storage when change is made
   */
  useEffect(() => {
    localStorage.setItem(marknotesLocal, JSON.stringify(marknotes));
  }, [marknotes]);

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
                <QNContent
                  quicknotes={quicknotes}
                  setQuicknotes={setQuicknotes}
                />
              </main>
            </Route>
            <Route path="/marknotes">
              <main>
                <MNContent marknotes={marknotes} setMarknotes={setMarknotes} />
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
