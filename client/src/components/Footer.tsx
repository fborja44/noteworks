/* Home Content Component
------------------------------------------------------------------------------*/
// React imports
import * as React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Image and icon imports
import { BiRefresh } from "react-icons/bi";

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.title.background};
  color: ${(props) => props.theme.title.textPrimary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 9px;

  width: 100vw;
  height: 20px;
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
    color: ${(props) => props.theme.title.textPrimary};
    margin-left: 0.5em;
    text-decoration: none;
  }

  a:visited {
    color: ${(props) => props.theme.title.textPrimary};
  }
`;

const FooterOption = styled.button`
  margin-left: 0.5rem;
  padding: 0 0.4rem 0 0.4rem;
  height: 100%;

  display: flex;
  align-items: center;
  background: inherit;
  color: inherit;
  font-size: inherit;
  border: 0;

  &:hover {
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
  return (
    <FooterContainer>
      <OptionContainer>
        <FooterOption
          onClick={async () => {
            await fetchQuicknotes();
            await fetchMarknotes();
            await fetchGroups();
          }}
        >
          <BiRefresh size={14} />
          <span>Refresh Notes</span>
        </FooterOption>
      </OptionContainer>
      <div
        css={css`
          margin-right: 1rem;
        `}
        id="cpy"
      >
        Francis Borja © 2021
      </div>
    </FooterContainer>
  );
};

export default Footer;
