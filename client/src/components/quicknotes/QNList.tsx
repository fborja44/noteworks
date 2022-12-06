/* Quicknotes List Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

import styled from "@emotion/styled";

// Common imports
import { Group, Marknote, Quicknote } from "../../common/types";

// Component imports
import QNComponent from "./QNComponent";
import { Empty } from "../Section";

const List = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */
  grid-template-columns: repeat(auto-fit, 230px);
  grid-auto-rows: auto;
  max-width: 100vw;
  row-gap: 1rem;
  column-gap: 1rem;
  z-index: 1;
`;

export interface QNListProps {
  QNSearchText?: string;
  quicknotes: Quicknote[];
  updateQuicknotesList: Function;
  groups: Group[];
  updateGroupsList: Function;
  handleUpdateGroup: (currentGroup: Group, updatedGroup: Group) => void;
  favorites?: boolean;
  handleUpdateQuicknote: (noteId: string, updatedQuicknote: Quicknote) => void;
  handleDeleteQuicknote: (noteId: string) => void;
  setSelectedTab?: React.Dispatch<React.SetStateAction<string>>;
}

const QNList: React.FC<QNListProps> = ({
  QNSearchText,
  quicknotes,
  updateQuicknotesList,
  groups,
  updateGroupsList,
  handleUpdateGroup,
  favorites,
  handleUpdateQuicknote,
  handleDeleteQuicknote,
}) => {
  let notes = quicknotes;
  // Filter notes by searchtext if given
  if (QNSearchText) {
    notes = quicknotes.filter(
      (note: Quicknote | Marknote) =>
        note.title.toLowerCase().includes(QNSearchText.toLowerCase()) ||
        note.body.toLowerCase().includes(QNSearchText.toLowerCase())
    );
  }

  // Filter notes by favorited if true
  if (favorites) {
    notes = quicknotes.filter((note: Quicknote | Marknote) => note.favorited);
  }

  const notesList = (
    <List>
      {notes.map((note: any) => (
        <QNComponent
          key={note._id}
          groups={groups}
          updateGroupsList={updateGroupsList}
          handleUpdateGroup={handleUpdateGroup}
          currentNote={note}
          updateQuicknotesList={updateQuicknotesList}
          handleUpdateQuicknote={handleUpdateQuicknote}
          handleDeleteQuicknote={handleDeleteQuicknote}
        />
      ))}
    </List>
  );

  const searchEmpty = (
    <Empty>
      <p>{`No notes found for the search term "${QNSearchText}".`}</p>
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
      {notes.length !== 0 ? notesList : QNSearchText ? searchEmpty : notesEmpty}
    </React.Fragment>
  );
};

QNList.defaultProps = {
  favorites: false,
};

export default QNList;
