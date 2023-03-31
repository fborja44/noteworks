/* Notes Explorer Item Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

// Common imports
import { Marknote, Group } from "../../common/types";
import { COLOR } from "../../common/color";

// Component imports
import {
  NotesExplorerItemContainer,
  NotesExplorerLink,
} from "./NotesExplorerItem";

// Image and icon imports
import { VscMarkdown } from "react-icons/vsc";

interface NotesExplorerMarknoteProps {
  marknote: Marknote;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  level: number;
}

const NotesExplorerMarknote = ({
  marknote,
  setSelectedTab,
  level,
}: NotesExplorerMarknoteProps) => {
  // React Router hooks
  const history = useHistory();
  const pathname = useLocation().pathname;

  // Trim note title if too long
  const title =
    marknote.title.trim() && marknote.title.length > 24 - level * 2
      ? marknote.title.slice(0, 24 - level * 2) + "..."
      : marknote.title;

  return (
    <NotesExplorerItemContainer
      className={pathname.includes(marknote._id) ? "selected" : ""}
    >
      <Link
        css={NotesExplorerLink}
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
          <span>{title}</span>
        ) : (
          <span className="untitled">Untitled Note</span>
        )}
      </Link>
    </NotesExplorerItemContainer>
  );
};

export default NotesExplorerMarknote;
