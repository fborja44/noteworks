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
import { Quicknote, Marknote, Group } from "../common/types";
import { darkTheme, lightTheme } from "../common/theme";
import { COLOR } from "../common/color";

// Component imports
import Titlebar from "./titlebar/Titlebar";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./Footer";

import HomePage from "./home/HomePage";
import QNPage from "./quicknotes/QNPage";
import MNPage from "./marknotes/MNPage";
import SettingsPage from "./settings/SettingsPage";
import GroupPage from "./groups/GroupPage";

// CSS imports
import "../css/app.css";
import "../css/quicknotes.css";
import "../css/marknotes.css";

import axios from "axios";

const RendererContainer = styled.div`
  background-color: ${(props) => props.theme.main.background};
  color: ${(props) => props.theme.main.textPrimary};
`;

const BASE_ADDR = "http://localhost:3001";

/**
 * Main application component
 */
const App = () => {
  /* Quicknotes State
  ------------------------------------------------------------------------------*/
  const [quicknotes, setQuicknotes] = useState<Quicknote[]>([]);

  /**
   * Effect hook to retrieve quicknotes from local storage
   */
  useEffect(() => {
    fetchQuicknotes();
  }, []); // Run on load

  const fetchQuicknotes = async () => {
    const { data: savedQuicknotes } = await axios({
      baseURL: BASE_ADDR,
      url: "/quicknotes",
      method: "GET",
    });
    // Check if notes were received
    if (savedQuicknotes) {
      setQuicknotes(savedQuicknotes);
    }
  };

  /**
   * Quicknote function to update the marknotes list in app state
   * @param noteId The marknote id
   * @param updatedQuicknote The data to update the marknote with
   */
  const updateQuicknotesList = (
    noteId: string,
    updatedQuicknote: Quicknote
  ) => {
    const updatedQuicknotesArray = quicknotes.map((note: any) => {
      if (note._id === noteId) {
        return updatedQuicknote;
      }
      return note;
    });
    setQuicknotes(updatedQuicknotesArray);
  };

  /**
   * Function to update a quicknote in the database with updated information
   * @param noteId The quicknote id
   * @param updatedQuicknote The new information in update with
   */
  const handleUpdateQuicknote = async (
    noteId: string,
    updatedQuicknote: Quicknote
  ) => {
    try {
      await axios({
        baseURL: BASE_ADDR,
        url: `/quicknotes/${noteId}`,
        method: "PATCH",
        data: updatedQuicknote,
      });
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * Function to delete a quicknote from the list
   * @param noteId The id of the quicknote to be deleted
   */
  const handleDeleteQuicknote = async (noteId: string) => {
    try {
      await axios({
        baseURL: BASE_ADDR,
        url: `/quicknotes/${noteId}`,
        method: "DELETE",
      });
      const newQuicknotes = quicknotes.filter(
        (note: Quicknote) => note._id !== noteId
      ); // don't need to make new array since filter returns new array
      setQuicknotes(newQuicknotes);
    } catch (e) {
      console.log(e);
    }
  };

  /* Marknotes State
  ------------------------------------------------------------------------------*/
  const [marknotes, setMarknotes] = useState<Marknote[]>([]);

  /**
   * Effect hook to retrieve marknotes from local storage
   */
  useEffect(() => {
    fetchMarknotes();
  }, []); // Run on load

  const fetchMarknotes = async () => {
    const { data: savedMarknotes } = await axios({
      baseURL: BASE_ADDR,
      url: "/marknotes",
      method: "GET",
    });
    // Check if notes were received
    if (savedMarknotes) {
      setMarknotes(savedMarknotes);
    }
  };

  /**
   * Marknote function to update the marknotes list in app state
   * @param noteId The marknote id
   * @param updatedMarknote The data to update the marknote with
   */
  const updateMarknotesList = (noteId: string, updatedMarknote: Marknote) => {
    const updatedMarknotesArray = marknotes.map((note: any) => {
      if (note._id === noteId) {
        return updatedMarknote;
      }
      return note;
    });
    setMarknotes(updatedMarknotesArray);
  };

  /**
   * Marknote function to update a marknote in the database
   * @param noteId The marknote id
   * @param updatedMarknote The data to update the marknote with
   */
  const handleUpdateMarknote = async (
    noteId: string,
    updatedMarknote: Marknote
  ) => {
    try {
      await axios({
        baseURL: BASE_ADDR,
        url: `/marknotes/${noteId}`,
        method: "PATCH",
        data: updatedMarknote,
      });
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * Marknote function to delete a marknote from the list
   * @param noteId The id of the marknote to be deleted
   */
  const handleDeleteMarknote = async (noteId: string) => {
    try {
      await axios({
        baseURL: BASE_ADDR,
        url: `/marknotes/${noteId}`,
        method: "DELETE",
      });
      const newMarknotes = marknotes.filter(
        (note: Marknote) => note._id !== noteId
      ); // don't need to make new array since filter returns new array
      setMarknotes(newMarknotes);
    } catch (e) {
      console.log(e);
    }
  };

  /* Selected tab State
  ------------------------------------------------------------------------------*/
  const [selectedTab, setSelectedTab] = useState(useLocation().pathname);

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

  /* Groups state
  ------------------------------------------------------------------------------*/
  const [groups, setGroups] = useState<Group[]>([]);

  /**
   * Effect hook to retrieve groups from local storage
   */
  useEffect(() => {
    fetchGroups();
  }, []); // Run on load

  const fetchGroups = async () => {
    const { data: savedGroups } = await axios({
      baseURL: BASE_ADDR,
      url: "/groups",
      method: "GET",
    });
    // Check if notes were received
    if (savedGroups) {
      setGroups(savedGroups);
    }
  };

  /**
   * Group function to add a new empty group to the list
   */
  const handleAddGroup = async () => {
    try {
      const { data: newGroup } = await axios({
        baseURL: BASE_ADDR,
        url: "/groups",
        method: "POST",
        data: {
          title: "",
          color: COLOR.dark_grey.id,
        },
      });
      setGroups([...groups, newGroup]);
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * Group function to update the marknotes list in app state
   * @param groupId The marknote id
   * @param updatedGroup The data to update the marknote with
   */
  const updateGroupsList = (groupId: string, updatedGroup: Group) => {
    const updatedGroupsArray = groups.map((note: any) => {
      if (note._id === groupId) {
        return updatedGroup;
      }
      return note;
    });
    setGroups(updatedGroupsArray);
  };

  /**
   * Group function to update a group in the database
   * @param currentGroup The group being updated
   * @param updatedGroup The data to update the group with
   */
  const handleUpdateGroup = async (groupId: string, updatedGroup: Group) => {
    try {
      await axios({
        baseURL: BASE_ADDR,
        url: `/groups/${groupId}`,
        method: "PATCH",
        data: updatedGroup,
      });
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * Group function to delete a group from the list
   * @param groupId The id of the group to be deleted
   */
  const handleDeleteGroup = async (groupId: string) => {
    try {
      await axios({
        baseURL: BASE_ADDR,
        url: `/groups/${groupId}`,
        method: "DELETE",
      });
      const newGroups = groups.filter((group: Group) => group._id !== groupId); // don't need to make new array since filter returns new array
      setGroups(newGroups);
    } catch (e) {
      console.log(e);
    }
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
                <HomePage
                  groups={groups}
                  updateGroupsList={updateGroupsList}
                  quicknotes={quicknotes}
                  updateQuicknotesList={updateQuicknotesList}
                  marknotes={marknotes}
                  updateMarknotesList={updateMarknotesList}
                  handleUpdateGroup={handleUpdateGroup}
                  handleDeleteGroup={handleDeleteGroup}
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
                  updateQuicknotesList={updateQuicknotesList}
                  groups={groups}
                  updateGroupsList={updateGroupsList}
                  setGroups={setGroups}
                  handleAddGroup={handleAddGroup}
                  handleUpdateGroup={handleUpdateGroup}
                  handleDeleteGroup={handleDeleteGroup}
                  handleUpdateQuicknote={handleUpdateQuicknote}
                  handleDeleteQuicknote={handleDeleteQuicknote}
                />
              </main>
            </Route>
            <Route path="/marknotes">
              <main>
                <MNPage
                  marknotes={marknotes}
                  updateMarknotesList={updateMarknotesList}
                  setMarknotes={setMarknotes}
                  groups={groups}
                  updateGroupsList={updateGroupsList}
                  setGroups={setGroups}
                  handleAddGroup={handleAddGroup}
                  handleUpdateGroup={handleUpdateGroup}
                  handleDeleteGroup={handleDeleteGroup}
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
              <Route path={`/groups/${group._id}`}>
                <main>
                  <GroupPage
                    currentGroup={group}
                    groups={groups}
                    updateGroupsList={updateGroupsList}
                    quicknotes={quicknotes}
                    updateQuicknotesList={updateQuicknotesList}
                    marknotes={marknotes}
                    updateMarknotesList={updateMarknotesList}
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
        <Footer
          fetchQuicknotes={fetchQuicknotes}
          fetchMarknotes={fetchMarknotes}
          fetchGroups={fetchGroups}
        />
      </RendererContainer>
    </ThemeProvider>
  );
};

export default App;
