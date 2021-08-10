/* Main App Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { Switch, Route, useLocation } from "react-router-dom";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, ThemeProvider } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { Quicknote, Marknote, Group } from "../common/types";
import { darkTheme, lightTheme } from "../common/theme";
import { COLOR } from "../common/color";

// Component imports
import Titlebar from "./Titlebar";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./Footer";

import HomeContent from "./home/HomePage";
import QNPage from "./quicknotes/QNPage";
import MNPage from "./marknotes/MNPage";
import SettingsPage from "./settings/SettingsPage";
import GroupPage from "./groups/GroupPage";

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
   * @param noteId The id of the quicknote to be deleted
   */
  const handleDeleteQuicknote = (noteId: string) => {
    const newQuicknotes = quicknotes.filter(
      (note: Quicknote) => note.id !== noteId
    ); // don't need to make new array since filter returns new array
    setQuicknotes(newQuicknotes);
  };

  /* Marknotes State
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
    // If not, keep; Otherwise, remove
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

  /* Groups state
  ------------------------------------------------------------------------------*/
  const [groups, setGroups] = useState<Group[]>([]);
  const groupsLocal = "denote_groups";

  /**
   * Effect hook to retrieve groups from local storage
   */
  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem(groupsLocal) || "{}");
    // Check if groups were received
    if (savedGroups) {
      setGroups(savedGroups);
    }
  }, []); // Run on load

  /**
   * Effect hook to save groups to local storage
   */
  useEffect(() => {
    localStorage.setItem(groupsLocal, JSON.stringify(groups));
  }, [groups]);

  /**
   * Group function to add a new empty group to the list
   */
  const handleAddGroup = () => {
    const newGroup: Group = {
      type: "group",
      id: nanoid(),
      title: "Untitled Group",
      color: COLOR.GREY_DARK,
      quicknotes: [],
      marknotes: [],
      lastModified: Date.now(),
      favorited: false,
    };

    setGroups([...groups, newGroup]);
  };

  /**
   * Group function to update a group in the list
   * @param currentGroup The group being updated
   * @param updatedGroup The data to update the group with
   */
  const handleUpdateGroup = (currentGroup: Group, updatedGroup: Group) => {
    const updatedGroupsArray = groups.map((group: Group) => {
      if (group.id === currentGroup.id) {
        return updatedGroup;
      }
      return group;
    });
    setGroups(updatedGroupsArray);
  };

  /**
   * Group function to delete a group from the list
   * @param groupId The id of the group to be deleted
   */
  const handleDeleteGroup = (groupId: string) => {
    setGroups(groups.filter((group: Group) => group.id !== groupId));
  };

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
                  groups={groups}
                  quicknotes={quicknotes}
                  marknotes={marknotes}
                  handleUpdateGroup={handleUpdateGroup}
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
                  groups={groups}
                  setGroups={setGroups}
                  handleAddGroup={handleAddGroup}
                  handleUpdateGroup={handleUpdateGroup}
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
                  groups={groups}
                  setGroups={setGroups}
                  handleAddGroup={handleAddGroup}
                  handleUpdateGroup={handleUpdateGroup}
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
            {groups.map((group) => (
              <Route path={`/groups/${group.id}`}>
                <main>
                  <GroupPage
                    currentGroup={group}
                    groups={groups}
                    quicknotes={quicknotes}
                    marknotes={marknotes}
                    handleUpdateGroup={handleUpdateGroup}
                    handleDeleteGroup={handleDeleteGroup}
                    handleUpdateQuicknote={handleUpdateQuicknote}
                    handleDeleteQuicknote={handleDeleteQuicknote}
                    handleUpdateMarknote={handleUpdateMarknote}
                    handleDeleteMarknote={handleDeleteMarknote}
                    setSelectedTab={setSelectedTab}
                  />
                </main>
              </Route>
            ))}
          </Switch>
        </div>
        <Footer />
      </RendererContainer>
    </ThemeProvider>
  );
};

export default App;
