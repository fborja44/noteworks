/* Home Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

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

interface FooterProps {
  fetchQuicknotes: Function;
  fetchMarknotes: Function;
  fetchGroups: Function;
}

const Footer = ({
  fetchQuicknotes,
  fetchMarknotes,
  fetchGroups,
}: FooterProps) => {
  const [refreshing, setRefreshing] = useState(false);

  return (
    <FooterContainer>
      <OptionContainer>
        <FooterOption
          disabled={refreshing}
          onClick={async () => {
            setRefreshing(true);
            try {
              await fetchQuicknotes();
              await fetchMarknotes();
              await fetchGroups();
            } catch (e: any) {
              console.log(e.toString());
            }
            setRefreshing(false);
          }}
          className={refreshing ? "blink" : ""}
        >
          <RefreshIcon />
          <span>{!refreshing ? "Refresh Notes" : "Refreshing..."}</span>
        </FooterOption>
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
