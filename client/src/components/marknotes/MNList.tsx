/* Marknotes List Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

import styled from "@emotion/styled";

import { useLocation } from "react-router-dom";

// Redux imports
import { useSelector } from "react-redux";

// Common imports
import { Group, Marknote, Quicknote } from "../../common/types";

// Component imports
import MNContainer from "../../containers/marknotes/MNContainer";
import NoteCreateButton from "../notes/NoteCreateButton";
import { Empty } from "../Section";
import { AppState } from "../../redux/reducers/rootReducer";

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 215px);
  grid-auto-rows: 280px;
  width: 100%;
  row-gap: 2em;
  column-gap: 2em;
  z-index: 1;
`;

export interface MNListProps {
  MNFilterText?: string;
  activeGroup?: Group;
  setActiveGroup?: Function;
  favorites?: boolean;
}

const MNList: React.FC<MNListProps> = ({
  MNFilterText,
  activeGroup,
  setActiveGroup,
  favorites,
}) => {
  // URL Pathname
  const pathname = useLocation().pathname;

  // Marknotes State
  const marknotesState: Marknote[] = useSelector(
    (state: AppState) => state.marknotesState
  );

  // Sort marknotes by last modified date
  let notes = marknotesState.sort(
    (a: Marknote, b: Marknote) => b.lastModified - a.lastModified
  );

  // Filter notes by group if on group page
  const group_id = pathname.split("/").pop();
  if (pathname.includes("group") && group_id) {
    notes = notes.filter((note: Marknote) => note.groups.includes(group_id));
  }

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
          <MNContainer
            key={note._id}
            setActiveGroup={setActiveGroup}
            currentNote={note}
          />
        )
      )}
      {!favorites && <NoteCreateButton noteType="marknote" group={activeGroup} />}
    </List>
  );

  const favoritesEmpty = (
    <Empty>
      <p>{`You have no favorited marknotes.`}</p>
    </Empty>
  );

  const searchEmpty = (
    <Empty>
      <p>{`No marknotes found for the term "${MNFilterText}".`}</p>
    </Empty>
  );

  if (notes.length === 0) {
    if (MNFilterText) {
      return searchEmpty;
    } else if (favorites) {
      return favoritesEmpty;
    }
  }
  return notesList;
};

MNList.defaultProps = {
  favorites: false,
};

export default MNList;
