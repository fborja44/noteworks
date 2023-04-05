/* Quicknotes List Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";

// Redux Imports
import { useSelector } from "react-redux";

// Common imports
import { Group, Marknote, Quicknote } from "../../common/types";

// Component imports
import QNComponent from "./QNComponent";
import NoteCreateButton from "../notes/NoteCreateButton";
import { Empty } from "../Section";

const List = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */
  grid-template-columns: repeat(auto-fit, 215px);
  grid-auto-rows: 215px;
  width: 100%;
  row-gap: 2em;
  column-gap: 2em;
  z-index: 1;
`;

export interface QNListProps {
  QNFilterText?: string;
  activeGroup?: Group;
  setActiveGroup?: Function;
  favorites?: boolean;
  setSaved: Function;
}

const QNList: React.FC<QNListProps> = ({
  QNFilterText,
  activeGroup,
  setActiveGroup,
  favorites,
  setSaved,
}) => {
  // URL Pathname
  const pathname = useLocation().pathname;

  // Quicknotes State
  const quicknotesState: Quicknote[] = useSelector(
    (state: any) => state.quicknotesState
  );

  /**
   * Unsaved notes
   */
  const unsavedNotesState = useSelector(
    (state: any) => state.unsavedNotesState
  );

  let notes = quicknotesState;

  // Filter notes by group if on group page
  const group_id = pathname.split("/").pop();
  if (pathname.includes("group") && group_id) {
    notes = notes.filter((note: Quicknote) => note.groups.includes(group_id));
  }

  // Filter notes by filter text if given
  if (QNFilterText) {
    notes = notes.filter(
      (note: Quicknote | Marknote) =>
        note.title.toLowerCase().includes(QNFilterText.toLowerCase()) ||
        note.body.toLowerCase().includes(QNFilterText.toLowerCase())
    );
  }

  // Filter notes by favorited if true
  if (favorites) {
    notes = notes.filter((note: Quicknote | Marknote) => note.favorited);
  }

  const notesList = (
    <List>
      {notes.map((note: any) => (
        <QNComponent
          key={note._id}
          setActiveGroup={setActiveGroup}
          currentNote={note}
          unsavedNotes={unsavedNotesState}
          setSaved={setSaved}
        />
      ))}
      <NoteCreateButton noteType="quicknote" group={activeGroup} />
    </List>
  );

  const favoritesEmpty = (
    <Empty>
      <p>{`You have no favorited marknotes.`}</p>
    </Empty>
  );

  const searchEmpty = (
    <Empty>
      <p>{`No quicknotes found for the term "${QNFilterText}".`}</p>
    </Empty>
  );

  if (notes.length === 0) {
    if (QNFilterText) {
      return searchEmpty;
    } else if (favorites) {
      return favoritesEmpty;
    }
  }
  return notesList;
};

QNList.defaultProps = {
  favorites: false,
};

export default QNList;
