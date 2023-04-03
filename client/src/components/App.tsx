/* Main App Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { fetchQuicknotes } from "../utils/quicknotes";
import { fetchMarknotes } from "../utils/marknotes";
import { fetchGroups } from "../utils/groups";

// Common imports
import { Group } from "../common/types";
import { darkTheme, lightTheme } from "../common/theme";

// Component imports
import Titlebar from "./titlebar/Titlebar";
import Sidebar from "./sidebar/Sidebar";
import NotesExplorer from "./notesexplorer/NotesExplorer";
import Footer from "./Footer";

import HomePage from "./home/HomePage";
import QNPage from "./quicknotes/QNPage";
import MNPage from "./marknotes/MNPage";
import SettingsPage from "./settings/SettingsPage";
import GroupPage from "./groups/GroupPage";
import SearchPage from "./searchpage/SearchPage";
import ChecklistsPage from "./checklists/ChecklistsPage";

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
  // Dispatch hook
  const dispatch = useDispatch();

  /* Search State
  ------------------------------------------------------------------------------*/
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Effect hook to retrieve data from the database.
   */
  useEffect(() => {
    fetchQuicknotes(dispatch);
    fetchMarknotes(dispatch);
    fetchGroups(dispatch);
  }, []); // Run on load

  // Groups State
  const groupsState: Group[] = useSelector((state: any) => state.groupsState);

  /* Selected tab State
  ------------------------------------------------------------------------------*/
  const pathname = useLocation().pathname;

  const [selectedTab, setSelectedTab] = useState(pathname);

  /* Notes Explorer State
  ------------------------------------------------------------------------------*/
  const [explorerOpen, setExplorerOpen] = useState(true);

  /* Current theme state
  ------------------------------------------------------------------------------*/
  const [appTheme, setAppTheme] = useState(darkTheme);

  const themeLocal = "denote_theme";
  /**
   * Effect hook to retrieve theme from local storage
   */
  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem(themeLocal) || "");
    // Check if theme was received
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
    <RendererContainer>
      <Titlebar setSearchTerm={setSearchTerm} />
      <div className="app-container">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        {pathname.includes("marknotes") && explorerOpen && (
          <NotesExplorer setSelectedTab={setSelectedTab} />
        )}
        <Switch>
          <Route exact path="/">
            <main>
              <HomePage setSelectedTab={setSelectedTab} />
            </main>
          </Route>
          <Route path="/quicknotes">
            <main>
              <QNPage />
            </main>
          </Route>
          <Route path={"/marknotes"}>
            <main>
              {
                <MNPage
                  explorerOpen={explorerOpen}
                  setExplorerOpen={setExplorerOpen}
                  setSelectedTab={setSelectedTab}
                />
              }
            </main>
          </Route>
          <Route path="/search">
            <main>
              <SearchPage
                searchTerm={searchTerm}
                setSelectedTab={setSelectedTab}
              />
            </main>
          </Route>
          <Route path="/checklists">
            <main>
              <ChecklistsPage />
            </main>
          </Route>
          <Route path="/settings">
            <main>
              <SettingsPage appTheme={appTheme} setAppTheme={setAppTheme} />
            </main>
          </Route>
          {groupsState.map((group: Group) => (
            <Route path={`/groups/${group._id}`}>
              <main>
                <GroupPage
                  currentGroup={group}
                  setSelectedTab={setSelectedTab}
                />
              </main>
            </Route>
          ))}
        </Switch>
      </div>
      <Footer />
    </RendererContainer>
  );
};

export default App;
