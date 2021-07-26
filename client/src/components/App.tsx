/* Main App Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

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

  /**
   * Function to update a quicknote in the list with updated information
   * @param currentQuicknote The quicknote being updated
   * @param updatedQuicknote The new information in update with
   */
  const handleUpdateQuicknote = (
    currentQuicknote: Quicknote,
    updatedQuicknote: Quicknote
  ) => {
    const updatedQuicknotesArray = quicknotes.map((note: any) => {
      if (note.id === currentQuicknote.id) {
        return updatedQuicknote;
      }
      return note;
    });
    setQuicknotes(updatedQuicknotesArray);
  };

  /**
   * Function to delete a quicknote from the list
   * @param id The id of the quicknote to be deleted
   */
  const handleDeleteQuicknote = (id: string) => {
    const newQuicknotes = quicknotes.filter(
      (note: Quicknote) => note.id !== id
    ); // don't need to make new array since filter returns new array
    setQuicknotes(newQuicknotes);
  };

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

  /**
   * Marknote function to update a marknote in the list
   * @param currentMarknote The marknote being updated
   * @param updatedMarknote The data to update the marknote with
   */
  const handleUpdateMarknote = (
    currentMarknote: Marknote,
    updatedMarknote: Marknote
  ) => {
    const updatedMarknotesArray = marknotes.map((note: Marknote) => {
      if (note.id === currentMarknote.id) {
        return updatedMarknote;
      }
      return note;
    });
    setMarknotes(updatedMarknotesArray);
  };

  /**
   * Marknote function to delete a marknote from the list
   * @param noteId The id of the marknote to be deleted
   */
  const handleDeleteMarknote = (noteId: string) => {
    // Use filter to check if id is the one we're deleting
    // If n ot, keep; Otherwise, remove
    setMarknotes(marknotes.filter((note: Marknote) => note.id !== noteId));
  };

  /* Selected tab State
  ------------------------------------------------------------------------------*/
  const [selectedTab, setSelectedTab] = useState(useLocation().pathname);

  return (
    <div className="App">
      <Header />
      <div className="app-container">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <Switch>
          <Route exact path="/">
            <main>
              <HomeContent
                quicknotes={quicknotes}
                marknotes={marknotes}
                handleUpdateMarknote={handleUpdateMarknote}
                handleDeleteMarknote={handleDeleteMarknote}
                handleUpdateQuicknote={handleUpdateQuicknote}
                handleDeleteQuicknote={handleDeleteQuicknote}
                setSelectedTab={setSelectedTab}
              />
            </main>
          </Route>
          <Route path="/quicknotes">
            <main>
              <QNContent
                quicknotes={quicknotes}
                setQuicknotes={setQuicknotes}
                handleUpdateQuicknote={handleUpdateQuicknote}
                handleDeleteQuicknote={handleDeleteQuicknote}
              />
            </main>
          </Route>
          <Route path="/marknotes">
            <main>
              <MNContent
                marknotes={marknotes}
                setMarknotes={setMarknotes}
                handleUpdateMarknote={handleUpdateMarknote}
                handleDeleteMarknote={handleDeleteMarknote}
                setSelectedTab={setSelectedTab}
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
      <Footer />
    </div>
  );
};

export default App;