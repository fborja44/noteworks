/* Notes Explorer Item Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";
import { useHistory, useLocation, Link } from "react-router-dom";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

// Redux imports
import { useDispatch } from "react-redux";
import { setSelectedTab } from "../../redux/actions";

// Common imports
import { Marknote } from "../../common/types";
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
  level: number;
}

const NotesExplorerMarknote = ({
  marknote,
  level,
}: NotesExplorerMarknoteProps) => {
  // Dispatch hook
  const dispatch = useDispatch();

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
        className="item-content"
        css={NotesExplorerLink}
        to={`/marknotes/${marknote._id}`}
        onClick={() => {
          dispatch(setSelectedTab("/marknotes"));
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
