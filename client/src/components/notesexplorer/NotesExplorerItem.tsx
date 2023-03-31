/* Notes Explorer Item Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";
import { useHistory, useLocation, Link } from "react-router-dom";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { Marknote } from "../../common/types";
import { COLOR } from "../../common/color";
import { VscMarkdown } from "react-icons/vsc";

// Component imports

// Image and icon imports

const NotesExplorerItemContainer = styled.li`
  display: flex;
  height: 34px;
  width: 100%;
  font-size: 12px;

  .markdown-icon {
    width: 20px;
    height: 20px;
    margin-right: 0.875em;
  }

  .untitled {
    font-style: italic;
  }

  &.selected {
    background: ${(props) => props.theme.sidebar.backgroundSecondary} !important;
  }

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.sidebar.hoverColor};
  }
`;

const MarknoteLink = css`
  display: flex;
  align-items: center;
  height: inherit;
  width: inherit;
  padding: 0 1.5em;
  text-decoration: none;
  color: inherit;
`;

interface NotesExplorerItemProps {
  marknote: Marknote;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const NotesExplorerItem = ({ marknote, setSelectedTab }: NotesExplorerItemProps) => {
  const history = useHistory();
  const pathname = useLocation().pathname;

  return (
    <NotesExplorerItemContainer className={pathname.includes(marknote._id) ? "selected" : ""}>
      <Link
        css={MarknoteLink}
        to={`/marknotes/${marknote._id}`}
        onClick={() => {
          setSelectedTab("/marknotes");
          history.push("/marknotes");
        }}
      >
        <VscMarkdown
          className="markdown-icon"
          css={css`
            color: ${COLOR[marknote.color].primary};
          `}
        />
        {marknote.title ? (
          <span>{marknote.title}</span>
        ) : (
          <span className="untitled">Untitled Note</span>
        )}
      </Link>
    </NotesExplorerItemContainer>
  );
};

export default NotesExplorerItem;
