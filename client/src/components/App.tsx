/* Main App Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { Quicknote, Marknote } from "../common/types";
import { darkTheme, lightTheme } from "../common/theme";

// Component imports
import Titlebar from "./Titlebar";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./Footer";

import HomeContent from "./home/HomePage";
import QNPage from "./quicknotes/QNPage";
import MNPage from "./marknotes/MNPage";
import SettingsPage from "./settings/SettingsPage";

// CSS imports
import "../css/app.css";
import "../css/quicknotes.css";
import "../css/marknotes.css";

const RendererContainer = styled.div`
  background-color: ${(props) => props.theme.main.background};
  color: ${(props) => props.theme.main.textPrimary};
`;

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

  /* Current theme state
  ------------------------------------------------------------------------------*/
  const [appTheme, setAppTheme] = useState(lightTheme);

  const themeLocal = "denote_theme";
  /**
   * Effect hook to retrieve theme from local storage
   */
  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem(themeLocal) || "");
    // Check if notes were received
    if (savedTheme) {
      setAppTheme(savedTheme === "light" ? lightTheme : darkTheme);
    }
  }, []); // Run on load

  /**
   * Effect hook to save theme to local storage
   */
  useEffect(() => {
    localStorage.setItem(themeLocal, JSON.stringify(appTheme.id));
  }, [appTheme]);

  return (
    <ThemeProvider theme={appTheme}>
      <RendererContainer>
        <Titlebar />
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
                <QNPage
                  quicknotes={quicknotes}
                  setQuicknotes={setQuicknotes}
                  handleUpdateQuicknote={handleUpdateQuicknote}
                  handleDeleteQuicknote={handleDeleteQuicknote}
                />
              </main>
            </Route>
            <Route path="/marknotes">
              <main>
                <MNPage
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
                <SettingsPage appTheme={appTheme} setAppTheme={setAppTheme} />
              </main>
            </Route>
          </Switch>
        </div>
        <Footer />
      </RendererContainer>
    </ThemeProvider>
  );
};

export default App;
