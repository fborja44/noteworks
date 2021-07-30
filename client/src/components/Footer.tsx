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
  background-color: var(--header-bg-color);
  color: var(--header-text-color-primary);
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

const GithubLink = css`
  margin-left: 0.5rem;
  padding: 0 0.4rem 0 0.4rem;
  height: 100%;

  display: flex;
  align-items: center;

  &:hover {
    background-color: var(--header-bg-color-hover);
    cursor: pointer;
    transition: background-color 0.2s ease 0s;
  }

  a {
    color: var(--header-text-color-primary);
    margin-left: 0.5em;
    text-decoration: none;
  }

  a:visited {
    color: var(--header-text-color-primary);
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div css={GithubLink} id="github-link">
        <VscGithub />
        <a href="https://github.com/fborja44/denote">Github Repo</a>
      </div>
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
