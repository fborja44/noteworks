/* Home Content Component
------------------------------------------------------------------------------*/
// React imports
import * as React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Image and icon imports
import { VscGithub } from "react-icons/vsc";

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

const GithubLinkContainer = styled.div`
  margin-left: 0.5rem;
  padding: 0 0.4rem 0 0.4rem;
  height: 100%;

  display: flex;
  align-items: center;

  &:hover {
    background-color: ${(props) => props.theme.title.backgroundSecondary};
    cursor: pointer;
    transition: background-color 0.2s ease 0s;
  }

  a {
    color: ${(props) => props.theme.title.textPrimary};
    margin-left: 0.5em;
    text-decoration: none;
  }

  a:visited {
    color: ${(props) => props.theme.title.textPrimary};
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <GithubLinkContainer id="github-link">
        <VscGithub />
        <a href="https://github.com/fborja44/denote">Github Repo</a>
      </GithubLinkContainer>
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
