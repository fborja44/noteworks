/* Notes Explorer Item Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { Marknote, Group } from "../../common/types";
import { COLOR } from "../../common/color";

// Component imports
import {
  NotesExplorerItemContainer,
  NotesExplorerLink,
} from "./NotesExplorerItem";
import NotesExplorerMarknote from "./NotesExplorerMarknote";

// Image and icon imports
import FolderIcon from "../icons/FolderIcon";
import FolderOpenIcon from "../icons/FolderOpenIcon";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";

export const GroupNotesList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    padding-left: 2em;

    .item-content {
      padding-left: 2.75em;
      border-left: 1px solid ${COLOR.dark_grey.primary};
    }
  }
`;

const GroupItemContainer = styled.div`
  display: flex;
`;

interface NotesExplorerGroupProps {
  group: Group;
  marknotes: Marknote[];
  explorerFilter: string;
}

const NotesExplorerGroup = ({
  group,
  marknotes,
  explorerFilter,
}: NotesExplorerGroupProps) => {
  // Open state for groups
  const [openGroup, setOpenGroup] = useState(false);

  // Trim group title if too long
  const title =
    group.title.trim() && group.title.length > 24
      ? group.title.slice(0, 24) + "..."
      : group.title;

  // Sort marknotes by last modified date
  let notes = marknotes.sort(
    (a: Marknote, b: Marknote) => b.lastModified - a.lastModified
  );

  // Filter notes by filter text if given
  if (explorerFilter) {
    notes = notes.filter(
      (note: Marknote) =>
        note.title.toLowerCase().includes(explorerFilter.toLowerCase()) ||
        note.body.toLowerCase().includes(explorerFilter.toLowerCase())
    );
  }

  const notesList = (
    <GroupNotesList>
      {notes.map(
        (marknote) =>
          marknote.groups.includes(group._id) && (
            <NotesExplorerMarknote marknote={marknote} level={2} />
          )
      )}
    </GroupNotesList>
  );

  return (
    <>
      <NotesExplorerItemContainer>
        <div
          css={[
            NotesExplorerLink,
            css`
              justify-content: space-between;
            `,
          ]}
          onClick={() => setOpenGroup(!openGroup)}
        >
          <GroupItemContainer>
            {openGroup ? (
              <ChevronDownIcon className="chevron-icon" />
            ) : (
              <ChevronRightIcon className="chevron-icon" />
            )}
            {!openGroup ? (
              <FolderIcon
                className="folder-icon"
                filled
                css={css`
                  color: ${COLOR[group.color].primary};
                `}
              />
            ) : (
              <FolderOpenIcon
                className="folder-icon"
                filled
                css={css`
                  color: ${COLOR[group.color].primary};
                `}
              />
            )}
            {group.title ? (
              <span>{title}</span>
            ) : (
              <span className="untitled">Untitled Group</span>
            )}
          </GroupItemContainer>
        </div>
      </NotesExplorerItemContainer>
      {openGroup && notesList}
    </>
  );
};

export default NotesExplorerGroup;
