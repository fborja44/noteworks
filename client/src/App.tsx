/* Main App Component
------------------------------------------------------------------------------*/
// React imports
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { nanoid } from "nanoid";

// Common imports
import { COLOR } from "./common/color";

// Component imports
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import HomeContent from "./components/home/HomeContent";

import QuicknotesContent from "./components/quicknotes/QuicknotesContent";

import MarknotesContent from "./components/marknotes/MarknotesContent";
import Marknote, { MarknoteProps } from "./components/marknotes/Marknote";

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
  const [marknotes, setMarknotes] = useState<MarknoteProps[]>([]);
  const local = "denote_marknotes";

  /**
   * Effect hook to retrieve marknotes from local storage
   */
  useEffect(() => {
    const savedMarknotes = JSON.parse(localStorage.getItem(local) || "{}");
    // Check if notes were received
    if (savedMarknotes) {
      setMarknotes(savedMarknotes);
    }
  }, []); // Run on load

  /**
   * Effect hook to save marknotes to local storage when change is made
   */
  useEffect(() => {
    localStorage.setItem(local, JSON.stringify(marknotes));
  }, [marknotes]);

  /**
   * Marknote function to add a new empty marknote to the list
   */
  const handleAddMarknote = () => {
    // Add new to state list
    const newMarknote = {
      id: nanoid(),
      title: "",
      body: "",
      lastModified: Date.now(),
      color: COLOR.GREY_DARK,
    };

    setMarknotes([...marknotes, newMarknote]);
  };

  /**
   * Marknote function to delete a marknote from the list
   * @param noteId The id of the marknote to be deleted
   */
  const handleDeleteMarknote = (noteId: any) => {
    // Use filter to check if id is the one we're deleting
    // If n ot, keep; Otherwise, remove
    console.log(noteId);
    setMarknotes(marknotes.filter((note: any) => note.id !== noteId));
  };

  /**
   * Marknote function to update a marknote in the list
   * @param currentMarknote The marknote being updated
   * @param updatedMarknote The data to update the marknote with
   */
  const handleUpdateMarknote = (
    currentMarknote: MarknoteProps,
    updatedMarknote: any
  ) => {
    const updatedMarknotesArray = marknotes.map((note: any) => {
      if (note.id === currentMarknote.id) {
        return updatedMarknote;
      }
      return note;
    });
    setMarknotes(updatedMarknotesArray);
  };

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
                <MarknotesContent
                  marknotes={marknotes}
                  setMarknotes={setMarknotes}
                  handleAddMarknote={handleAddMarknote}
                  handleDeleteMarknote={handleDeleteMarknote}
                  handleUpdateMarknote={handleUpdateMarknote}
                />
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
