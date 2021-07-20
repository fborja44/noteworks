/* Main App Component
------------------------------------------------------------------------------*/
// React imports
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { nanoid } from "nanoid";

// Component imports
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import QuicknotesContent from "./components/quicknotes/QuicknotesContent";
import MarknotesContent from "./components/marknotes/MarknotesContent";

// CSS imports
import "./css/app.css";
import "./css/quicknotes.css";
import "./css/marknotes.css";

/**
 * Main application component
 */
const App = () => {
  // Search state hook
  const [searchText, setSearchText] = useState("");

  const [marknotes, setMarknotes] = useState([
    {
      id: nanoid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    },
  ]);

  return (
    <div className="App">
      <Header handleSearchNote={setSearchText} />
      <Router>
        <div className="app-container">
          <Sidebar />
          <Switch>
            <Route path="/quicknotes">
              <main>
                <div className="main-content-wrapper">
                  <QuicknotesContent searchText={searchText} />
                </div>
              </main>
            </Route>
            <Route path="/marknotes">
              <main>
                <MarknotesContent
                  marknotes={marknotes}
                  setMarknotes={setMarknotes}
                />
              </main>
            </Route>
            <Route path="/settings">
              <main>
                <div className="main-content-wrapper">
                  <div>Settings</div>
                </div>
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
