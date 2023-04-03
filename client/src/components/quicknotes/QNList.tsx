/* Quicknotes List Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";

// Redux Imports
import { useSelector } from "react-redux";

// Common imports
import { Marknote, Quicknote } from "../../common/types";

// Component imports
import QNComponent from "./QNComponent";
import QNCreateButton from "./QNCreateButton";
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
  setActiveGroup?: Function;
  favorites?: boolean;
  setSelectedTab?: React.Dispatch<React.SetStateAction<string>>;
  setSaved: Function;
}

const QNList: React.FC<QNListProps> = ({
  QNFilterText,
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
      <QNCreateButton />
    </List>
  );

  const searchEmpty = (
    <Empty>
      <p>{`No notes found for the term "${QNFilterText}".`}</p>
    </Empty>
  );

  const notesEmpty = !favorites ? (
    <Empty>
      <p>You have no saved quicknotes.</p>
      <p>Create one now by pressing the + button in the menu above!</p>
    </Empty>
  ) : (
    <Empty>
      <p>You have no favorited marknotes.</p>
    </Empty>
  );

  return (
    <React.Fragment>
      {notes.length !== 0 ? notesList : QNFilterText ? searchEmpty : notesEmpty}
    </React.Fragment>
  );
};

QNList.defaultProps = {
  favorites: false,
};

export default QNList;
