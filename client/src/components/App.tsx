/* Main App Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuicknotes,
  updateMarknotes,
  updateGroups,
} from "../redux/actions";

// Common imports
import { Quicknote, Marknote, Group } from "../common/types";
import { darkTheme, lightTheme } from "../common/theme";
import { COLOR } from "../common/color";

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
  const dispatch = useDispatch();

  /* Quicknotes State
  ------------------------------------------------------------------------------*/
  const history = useHistory();

  /* Search State
  ------------------------------------------------------------------------------*/
  const [searchTerm, setSearchTerm] = useState("");

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
      dispatch(updateQuicknotes(savedQuicknotes));
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
   * Marknote function to add a new empty marknote to the list
   */
  const handleAddMarknote = async () => {
    // Add new to state list
    try {
      const { data: newMarknote } = await axios({
        baseURL: BASE_ADDR,
        url: "/marknotes",
        method: "POST",
        data: {
          title: "",
          color: COLOR.dark_grey.id,
          body: "",
        },
      });
      setMarknotes([...marknotes, newMarknote]);
      // Redirect when new note is added
      history.push("/marknotes");
      history.push(`/marknotes/${newMarknote._id}`);
    } catch (e) {
      console.log(e);
    }
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
    <RendererContainer>
      <Titlebar setSearchTerm={setSearchTerm} />
      <div className="app-container">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        {pathname.includes("marknotes") && explorerOpen && (
          <NotesExplorer
            marknotes={marknotes}
            groups={groups}
            setSelectedTab={setSelectedTab}
            handleAddMarknote={handleAddMarknote}
            handleAddGroup={handleAddGroup}
          />
        )}
        <Switch>
          <Route exact path="/">
            <main>
              <HomePage
                groups={groups}
                updateGroupsList={updateGroupsList}
                marknotes={marknotes}
                updateMarknotesList={updateMarknotesList}
                handleUpdateGroup={handleUpdateGroup}
                handleDeleteGroup={handleDeleteGroup}
                handleUpdateMarknote={handleUpdateMarknote}
                handleDeleteMarknote={handleDeleteMarknote}
                setSelectedTab={setSelectedTab}
              />
            </main>
          </Route>
          <Route path="/quicknotes">
            <main>
              <QNPage
                groups={groups}
                updateGroupsList={updateGroupsList}
                setGroups={setGroups}
                handleAddGroup={handleAddGroup}
                handleUpdateGroup={handleUpdateGroup}
                handleDeleteGroup={handleDeleteGroup}
              />
            </main>
          </Route>
          <Route path={"/marknotes"}>
            <main>
              {
                <MNPage
                  explorerOpen={explorerOpen}
                  setExplorerOpen={setExplorerOpen}
                  marknotes={marknotes}
                  updateMarknotesList={updateMarknotesList}
                  setMarknotes={setMarknotes}
                  groups={groups}
                  updateGroupsList={updateGroupsList}
                  setGroups={setGroups}
                  handleAddGroup={handleAddGroup}
                  handleUpdateGroup={handleUpdateGroup}
                  handleDeleteGroup={handleDeleteGroup}
                  handleAddMarknote={handleAddMarknote}
                  handleUpdateMarknote={handleUpdateMarknote}
                  handleDeleteMarknote={handleDeleteMarknote}
                  setSelectedTab={setSelectedTab}
                />
              }
            </main>
          </Route>
          <Route path="/search">
            <main>
              <SearchPage
                searchTerm={searchTerm}
                groups={groups}
                updateGroupsList={updateGroupsList}
                marknotes={marknotes}
                updateMarknotesList={updateMarknotesList}
                handleUpdateGroup={handleUpdateGroup}
                handleDeleteGroup={handleDeleteGroup}
                handleUpdateMarknote={handleUpdateMarknote}
                handleDeleteMarknote={handleDeleteMarknote}
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
          {groups.map((group) => (
            <Route path={`/groups/${group._id}`}>
              <main>
                <GroupPage
                  currentGroup={group}
                  groups={groups}
                  updateGroupsList={updateGroupsList}
                  marknotes={marknotes}
                  updateMarknotesList={updateMarknotesList}
                  handleUpdateGroup={handleUpdateGroup}
                  handleDeleteGroup={handleDeleteGroup}
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
  );
};

export default App;
