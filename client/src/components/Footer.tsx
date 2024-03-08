/* Home Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { COLOR } from "../common/color";

// Firebase
import { useContext } from "react";
import { AuthContext } from "../firebase/AuthProvider";

import { enqueueSnackbar } from "notistack";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { fetchQuicknotes } from "../utils/quicknotes";
import { fetchMarknotes } from "../utils/marknotes";
import { fetchChecklists } from "../utils/checklists";
import { fetchGroups } from "../utils/groups";

// Image and icon imports
import RefreshIcon from "./icons/RefreshIcon";
import CheckCircleIcon from "./icons/CheckCircleIcon";
import ExclamationTriangleIcon from "./icons/ExclamationTriangle";
import { VscGithubInverted } from "react-icons/vsc";

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.title.background};
  color: ${(props) => props.theme.title.textSecondary};
  border-top: 1px solid ${(props) => props.theme.title.borderColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 9px;

  width: 100vw;
  height: 25px;
  position: fixed;
  bottom: 0;
  z-index: 1000;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  a,
  span {
    margin-left: 0.5em;
    text-decoration: none;
  }

  a:visited {
    color: ${(props) => props.theme.title.textSecondary};
  }
`;

const FooterOption = styled.button`
  margin-left: 0.5rem;
  padding: 0 0.4rem;
  height: 100%;
  width: fit-content;

  color: ${(props) => props.theme.title.textSecondary};

  display: flex;
  justify-content: center;
  align-items: center;
  background: inherit;
  color: inherit;
  font-size: inherit;
  border: 0;

  svg {
    height: 12px;
    width: 12px;
  }

  &:hover:enabled {
    background-color: ${(props) => props.theme.title.backgroundSecondary};
    cursor: pointer;
    transition: background-color 0.2s ease 0s;
  }
`;

const FooterLink = styled.a`
  margin-left: 0.5rem;
  padding: 0 0.4rem;
  height: 100%;
  width: fit-content;

  color: ${(props) => props.theme.title.textSecondary};

  display: flex;
  justify-content: center;
  align-items: center;
  background: inherit;
  color: inherit;
  font-size: inherit;
  border: 0;

  svg {
    height: 12px;
    width: 12px;
  }

  &:hover {
    background-color: ${(props) => props.theme.title.backgroundSecondary};
    cursor: pointer;
    transition: background-color 0.2s ease 0s;
  }
`;

const Footer = () => {
  // Firebase user context hook
  const currentUser = useContext(AuthContext);

  // Dispatch hook
  const dispatch = useDispatch();

  // Refreshing state
  const [refreshing, setRefreshing] = useState(false);

  const connected = useSelector((state: any) => state.connectionState);
  console.log(connected);

  /**
   * Function to refresh all notes data.
   */
  const refreshNotes = async () => {
    if (!currentUser) {
      console.log("Error: Unauthorized user.");
      return;
    }
    setRefreshing(true);
    try {
      await fetchQuicknotes(dispatch, currentUser);
      await fetchMarknotes(dispatch, currentUser);
      await fetchGroups(dispatch, currentUser);
      await fetchChecklists(dispatch, currentUser);
      enqueueSnackbar("Notes have been refreshed.", { variant: "success" });
    } catch (e: any) {
      console.log(e.toString());
      enqueueSnackbar("Failed to refresh notes.", { variant: "error" });
    }
    setRefreshing(false);
  };

  return (
    <FooterContainer>
      <OptionContainer>
        {connected ? (
          <FooterOption
            disabled
            onClick={() => refreshNotes()}
            className={refreshing ? "blink" : ""}
            css={css`
              color: ${COLOR.green.primary};
            `}
          >
            <CheckCircleIcon />
            <span>Connected</span>
          </FooterOption>
        ) : (
          <FooterOption
            disabled
            onClick={() => refreshNotes()}
            className={refreshing ? "blink" : ""}
            css={css`
              color: ${COLOR.red.primary};
            `}
          >
            <ExclamationTriangleIcon />
            <span className="blink">Reconnecting</span>
          </FooterOption>
        )}

        {currentUser && (
          <FooterOption
            disabled={refreshing}
            onClick={() => refreshNotes()}
            className={refreshing ? "blink" : ""}
          >
            <RefreshIcon />
            <span>{!refreshing ? "Refresh Notes" : "Refreshing..."}</span>
          </FooterOption>
        )}
      </OptionContainer>
      <OptionContainer>
        <div>Francis Borja © 2021-2022</div>
        <FooterLink href="https://github.com/fborja44/notify-app" target="_blank">
          <VscGithubInverted />
        </FooterLink>
      </OptionContainer>
    </FooterContainer>
  );
};

export default Footer;
