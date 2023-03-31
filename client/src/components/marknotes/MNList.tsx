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
  MNFilterText?: string;
  marknotes: Marknote[];
  updateMarknotesList: Function;
  groups: Group[];
  updateGroupsList: Function;
  setGroupPage?: Function;
  handleUpdateGroup: (groupId: string, updatedGroup: Group) => void;
  favorites?: boolean;
  handleUpdateMarknote: (noteId: string, updatedMarknote: Marknote) => void;
  handleDeleteMarknote: (noteId: string) => void;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const MNList: React.FC<MNListProps> = ({
  MNFilterText,
  marknotes,
  updateMarknotesList,
  groups,
  updateGroupsList,
  setGroupPage,
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

  // Filter notes by filter text if given
  if (MNFilterText) {
    notes = notes.filter(
      (note: Quicknote | Marknote) =>
        note.title.toLowerCase().includes(MNFilterText.toLowerCase()) ||
        note.body.toLowerCase().includes(MNFilterText.toLowerCase())
    );
  }

  // Filter notes by favorited if true
  if (favorites) {
    notes = notes.filter((note: Quicknote | Marknote) => note.favorited);
  }

  const notesList = (
    <List>
      {notes.map(
        (
          note // Note should not be a member of a group to be listed with the general notes
        ) => (
          <MNComponentContainer
            key={note._id}
            groups={groups}
            updateGroupsList={updateGroupsList}
            handleUpdateGroup={handleUpdateGroup}
            setGroupPage={setGroupPage}
            currentNote={note}
            updateMarknotesList={updateMarknotesList}
            handleUpdateMarknote={handleUpdateMarknote}
            handleDeleteMarknote={handleDeleteMarknote}
            setSelectedTab={setSelectedTab}
          />
        )
      )}
    </List>
  );

  const searchEmpty = (
    <Empty>
      <p>{`No notes found for the term "${MNFilterText}".`}</p>
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
      {notes.length !== 0 ? notesList : MNFilterText ? searchEmpty : notesEmpty}
    </React.Fragment>
  );
};

MNList.defaultProps = {
  favorites: false,
};

export default MNList;
