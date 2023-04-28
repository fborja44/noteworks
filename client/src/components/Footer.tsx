/* Home Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Firebase
import { useContext } from "react";
import { AuthContext } from "../firebase/AuthProvider";

import { enqueueSnackbar } from "notistack";

// Redux imports
import { useDispatch } from "react-redux";
import { fetchQuicknotes } from "../utils/quicknotes";
import { fetchMarknotes } from "../utils/marknotes";
import { fetchChecklists } from "../utils/checklists";
import { fetchGroups } from "../utils/groups";

// Image and icon imports
import RefreshIcon from "./icons/RefreshIcon";

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
  height: 100%;
  a,
  span {
    color: ${(props) => props.theme.title.textSecondary};
    margin-left: 0.5em;
    text-decoration: none;
  }

  a:visited {
    color: ${(props) => props.theme.title.textSecondary};
  }
`;

const FooterOption = styled.button`
  margin-left: 0.5rem;
  padding: 0 0.4rem 0 0.4rem;
  height: 100%;
  width: 90px;

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

const Footer = () => {
  // Firebase user context hook
  const currentUser = useContext(AuthContext);

  // Dispatch hook
  const dispatch = useDispatch();

  // Refreshing state
  const [refreshing, setRefreshing] = useState(false);

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
        {currentUser && <FooterOption
          disabled={refreshing}
          onClick={() => refreshNotes()}
          className={refreshing ? "blink" : ""}
        >
          <RefreshIcon />
          <span>{!refreshing ? "Refresh Notes" : "Refreshing..."}</span>
        </FooterOption>}
      </OptionContainer>
      <div
        css={css`
          margin-right: 1rem;
        `}
        id="cpy"
      >
        Francis Borja © 2021-2023
      </div>
    </FooterContainer>
  );
};

export default Footer;
