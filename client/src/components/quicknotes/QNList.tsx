/* Quicknotes Main Content Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

import styled from "@emotion/styled";

// Common imports
import { Marknote, Quicknote } from "../../common/types";

// Component imports
import QNComponent from "./QNComponent";

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

const Empty = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-style: italic;
  text-align: center;

  p {
    margin: 0.5rem;
  }

  svg {
    position: relative;
    top: 3px;
    margin: 0 0.2em;
  }
`;

export interface QNListProps {
  QNSearchText?: string;
  quicknotes: Quicknote[] | Marknote[];
  favorites?: boolean;
  handleUpdateQuicknote: (
    currentQuicknote: Quicknote,
    updatedQuicknote: Quicknote
  ) => void;
  handleDeleteQuicknote: (noteId: string) => void;
  setSelectedTab?: React.Dispatch<React.SetStateAction<string>>;
}

const QNList: React.FC<QNListProps> = ({
  QNSearchText,
  quicknotes,
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
          key={note.id}
          currentNote={note}
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
      <p>You have no saved marknotes.</p>
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
