/* Marknotes List Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

import styled from "@emotion/styled";

// Common imports
import { Group, Marknote, Quicknote } from "../../common/types";

// Component imports
import MNComponentContainer from "../../containers/marknotes/MNComponentContainer";
import { Empty } from "../Section";

const List = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */
  grid-template-columns: repeat(auto-fit, 240px);
  grid-auto-rows: fit-content;
  max-width: 100vw;
  row-gap: 1rem;
  column-gap: 1rem;
  z-index: 1;
`;

export interface MNListProps {
  MNSearchText?: string;
  marknotes: Quicknote[] | Marknote[];
  updateMarknotesList: Function;
  groups: Group[];
  updateGroupsList: Function;
  handleUpdateGroup: (groupId: string, updatedGroup: Group) => void;
  favorites?: boolean;
  handleUpdateMarknote: (noteId: string, updatedMarknote: Marknote) => void;
  handleDeleteMarknote: (noteId: string) => void;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const MNList: React.FC<MNListProps> = ({
  MNSearchText,
  marknotes,
  updateMarknotesList,
  groups,
  updateGroupsList,
  handleUpdateGroup,
  favorites,
  handleUpdateMarknote,
  handleDeleteMarknote,
  setSelectedTab,
}) => {
  // Sort marknotes by last modified date
  let notes = marknotes.sort(
    (a: Marknote, b: Marknote) => b.lastModified - a.lastModified
  );

  // Filter notes by searchtext if given
  if (MNSearchText) {
    notes = notes.filter(
      (note: Quicknote | Marknote) =>
        note.title.toLowerCase().includes(MNSearchText.toLowerCase()) ||
        note.body.toLowerCase().includes(MNSearchText.toLowerCase())
    );
  }

  // Filter notes by favorited if true
  if (favorites) {
    notes = notes.filter((note: Quicknote | Marknote) => note.favorited);
  }

  const notesList = (
    <List>
      {notes.map((note) => (
        <MNComponentContainer
          key={note._id}
          groups={groups}
          updateGroupsList={updateGroupsList}
          handleUpdateGroup={handleUpdateGroup}
          currentNote={note}
          updateMarknotesList={updateMarknotesList}
          handleUpdateMarknote={handleUpdateMarknote}
          handleDeleteMarknote={handleDeleteMarknote}
          setSelectedTab={setSelectedTab}
        />
      ))}
    </List>
  );

  const searchEmpty = (
    <Empty>
      <p>{`No notes found for the search term "${MNSearchText}".`}</p>
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
      {notes.length !== 0 ? notesList : MNSearchText ? searchEmpty : notesEmpty}
    </React.Fragment>
  );
};

MNList.defaultProps = {
  favorites: false,
};

export default MNList;
