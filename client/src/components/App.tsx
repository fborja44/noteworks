/* Main App Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import styled from "@emotion/styled";

import socketIO, { Socket } from "socket.io-client";
import socketConfig from "../config/socket.json";

import { ThemeProvider } from "@emotion/react";

// Firebase
import { useContext } from "react";
import { AuthContext } from "../firebase/AuthProvider";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { setConnection } from "../redux/actions";
import { fetchQuicknotes } from "../utils/quicknotes";
import { fetchMarknotes } from "../utils/marknotes";
import { fetchGroups } from "../utils/groups";

// Common imports
import { Group } from "../common/types";
import { darkTheme, lightTheme } from "../common/theme";
import { fetchChecklists } from "../utils/checklists";

// Component imports
import Titlebar from "./titlebar/Titlebar";
import Sidebar from "./sidebar/Sidebar";
import NotesExplorer from "./notesexplorer/NotesExplorer";
import Footer from "./Footer";
import LoginModal from "./auth/LoginModal";
import CreateAccountModal from "./auth/CreateAccountModal";
import ResetPasswordModal from "./auth/ResetPasswordModal";
import EmptyPage from "./EmptyPage";

import HomePage from "./home/HomePage";
import FavoritesPage from "./home/FavoritesPage";
import QNPage from "./quicknotes/QNPage";
import MNPage from "./marknotes/MNPage";
import SettingsPage from "./settings/SettingsPage";
import GroupPage from "./groups/GroupPage";
import SearchPage from "./searchpage/SearchPage";
import ChecklistsPage from "./checklists/ChecklistsPage";
import ProfilePage from "./profile/ProfilePage";
import FrownIcon from "./icons/FrownIcon";

// CSS imports
import "../css/app.css";
import "../css/quicknotes.css";
import "../css/marknotes.css";
import "react-tooltip/dist/react-tooltip.css";

const RendererContainer = styled.div`
  background-color: ${(props) => props.theme.main.background};
  color: ${(props) => props.theme.main.textPrimary};
`;

/**
 * Main application component
 */
const App = () => {
  // Firebase user context hook
  const currentUser = useContext(AuthContext);

  // Dispatch hook
  const dispatch = useDispatch();

  // Current path
  const pathname = useLocation().pathname;

  const fetchNotes = () => {
    if (!currentUser) return;
    fetchQuicknotes(dispatch, currentUser);
    fetchMarknotes(dispatch, currentUser);
    fetchGroups(dispatch, currentUser);
    fetchChecklists(dispatch, currentUser);
  };

  /**
   * Effect hook to retrieve data from the database.
   */
  useEffect(() => {
    fetchNotes();
  }, []); // Run on load

  // Groups State
  const groupsState: Group[] = useSelector((state: any) => state.groupsState);

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

    // Socket.io setup
    const socket: Socket = socketIO(socketConfig.serverAddress);
    socket.on("connect", () => {
      console.log("Connected to server.");
      dispatch(setConnection(true));
      fetchNotes();
    });
    socket.on("reconnect", () => {
      console.log("Re-established connection to server.");
      dispatch(setConnection(true));
      fetchNotes();
    });
    socket.on("disconnect", () => {
      console.error("Lost connection to server.");
      dispatch(setConnection(false));
    });
  }, []); // Run on load

  /**
   * Effect hook to save theme to local storage
   */
  useEffect(() => {
    localStorage.setItem(themeLocal, JSON.stringify(appTheme.id));
  }, [appTheme]);

  // Login Modal open state
  const [openLogin, setOpenLogin] = useState(false);

  // Create Account Modal open state
  const [openCreateAccount, setOpenCreateAccount] = useState(false);

  // Reset Password Modal open state
  const [openResetPassword, setOpenResetPassword] = useState(false);

  return (
    <ThemeProvider theme={appTheme}>
      <RendererContainer>
        <Titlebar
          setOpenLogin={setOpenLogin}
          setOpenCreateAccount={setOpenCreateAccount}
        />
        <div className="app-container">
          <Sidebar />
          {pathname.includes("marknotes") && explorerOpen && <NotesExplorer />}
          <main>
            <Switch>
              <Route exact path="/">
                <HomePage
                  setOpenLogin={setOpenLogin}
                  setOpenCreateAccount={setOpenCreateAccount}
                />
              </Route>
              <Route exact path="/favorites">
                <FavoritesPage />
              </Route>
              <Route path="/quicknotes">
                <QNPage />
              </Route>
              <Route path={"/marknotes"}>
                {
                  <MNPage
                    explorerOpen={explorerOpen}
                    setExplorerOpen={setExplorerOpen}
                  />
                }
              </Route>
              <Route path="/search">
                <SearchPage />
              </Route>
              <Route path="/checklists">
                <ChecklistsPage />
              </Route>
              <Route path="/settings">
                <SettingsPage appTheme={appTheme} setAppTheme={setAppTheme} />
              </Route>
              <Route path="/profile">
                <ProfilePage />
              </Route>
              {groupsState.map((group: Group) => (
                <Route path={`/groups/${group._id}`}>
                  <GroupPage currentGroup={group} />
                </Route>
              ))}
              <Route>
                <EmptyPage icon={<FrownIcon />}>
                  Error: Page Not Found
                </EmptyPage>
              </Route>
            </Switch>
          </main>
        </div>
        <Footer />
        <LoginModal
          openLogin={openLogin}
          setOpenLogin={setOpenLogin}
          setOpenCreateAccount={setOpenCreateAccount}
          setOpenResetPassword={setOpenResetPassword}
        />
        <CreateAccountModal
          openCreateAccount={openCreateAccount}
          setOpenCreateAccount={setOpenCreateAccount}
          setOpenLogin={setOpenLogin}
        />
        <ResetPasswordModal
          openResetPassword={openResetPassword}
          setOpenResetPassword={setOpenResetPassword}
        />
      </RendererContainer>
    </ThemeProvider>
  );
};

export default App;
