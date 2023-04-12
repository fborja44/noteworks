/* Checklists List Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";

// Redux Imports
import { useSelector } from "react-redux";

// Common imports
import { Checklist, Group } from "../../common/types";

// Component imports
import NoteCreateButton from "../notes/NoteCreateButton";
import ChecklistComponent from "./ChecklistComponent";
import { Empty } from "../Section";

const List = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */
  grid-template-columns: repeat(auto-fit, 215px);
  grid-auto-rows: 72px;
  width: 100%;
  row-gap: 2em;
  column-gap: 2em;
  z-index: 1;
`;

export interface ChecklistListProps {
  activeGroup?: Group;
  setActiveGroup?: Function;
  ChecklistFilterText?: string;
  favorites?: boolean;
}

const ChecklistList: React.FC<ChecklistListProps> = ({
  activeGroup,
  setActiveGroup,
  ChecklistFilterText,
  favorites,
}) => {
  // URL Pathname
  const pathname = useLocation().pathname;

  // Checklists State
  const checklistsState: Checklist[] = useSelector(
    (state: any) => state.checklistsState
  );

  let checklists = checklistsState;

  // Filter checklists by group if on group page
  const group_id = pathname.split("/").pop();
  if (pathname.includes("group") && group_id) {
    checklists = checklists.filter((checklist: Checklist) =>
      checklist.groups.includes(group_id)
    );
  }

  // Filter checklists by filter text if given
  if (ChecklistFilterText) {
    checklists = checklists.filter((checklist: Checklist) =>
      checklist.title.toLowerCase().includes(ChecklistFilterText.toLowerCase())
    );
  }

  // Filter checklists by favorited if true
  if (favorites) {
    checklists = checklists.filter(
      (checklist: Checklist) => checklist.favorited
    );
  }

  const checklistsList = (
    <List>
      {checklists.map((checklist: Checklist) => (
        <ChecklistComponent
          currentChecklist={checklist}
          setActiveGroup={setActiveGroup}
        />
      ))}
      <NoteCreateButton
        noteType={"checklist"}
        variant="horizontal"
        group={activeGroup}
      />
    </List>
  );

  const favoritesEmpty = (
    <Empty>
      <p>{`You have no favorited checklists.`}</p>
    </Empty>
  );

  const searchEmpty = (
    <Empty>
      <p>{`No checklists found for the term"${ChecklistFilterText}".`}</p>
    </Empty>
  );

  if (checklists.length === 0) {
    if (ChecklistFilterText) {
      return searchEmpty;
    } else if (favorites) {
      return favoritesEmpty;
    }
  }
  return checklistsList;
};

ChecklistList.defaultProps = {
  favorites: false,
};

export default ChecklistList;
