/* Group List Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

import styled from "@emotion/styled";

// Common imports
import { Group } from "../../common/types";

// Component imports
import GroupComponent from "./GroupComponent";
import { Empty } from "../Section";

// Image and icon imports
import { MdCreateNewFolder } from "react-icons/md";

const List = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */
  grid-template-columns: repeat(auto-fit, 215px);
  grid-auto-rows: fit-content;
  max-width: 100vw;
  min-height: 60px;
  row-gap: 1rem;
  column-gap: 1rem;
  z-index: 1;
`;

export interface GroupListProps {
  GroupsFilterText?: string;
  groups: Group[];
  updateGroupsList: Function;
  handleUpdateGroup: (groupId: string, updatedGroup: Group) => void;
  handleDeleteGroup: (groupId: string) => void;
  favorites?: boolean;
}

const GroupList: React.FC<GroupListProps> = ({
  GroupsFilterText,
  groups,
  updateGroupsList,
  handleUpdateGroup,
  handleDeleteGroup,
  favorites,
}) => {
  if (favorites) {
    groups = groups.filter((group) => group.favorited);
  }

  let filteredGroups = groups;
  // Filter notes by searchtext if given
  if (GroupsFilterText) {
    filteredGroups = groups.filter((group) =>
      group.title.toLowerCase().includes(GroupsFilterText.toLowerCase())
    );
  }

  const groupsList = (
    <List>
      {filteredGroups.map((group) => (
        <GroupComponent
          key={group._id}
          currentGroup={group}
          updateGroupsList={updateGroupsList}
          handleUpdateGroup={handleUpdateGroup}
          handleDeleteGroup={handleDeleteGroup}
        />
      ))}
    </List>
  );

  const searchEmpty = (
    <Empty>
      <p>{`No groups found for the term "${GroupsFilterText}".`}</p>
    </Empty>
  );

  const groupsEmpty = !favorites ? (
    <Empty>
      <p>You have no groups.</p>
      <p>
        Create one now by pressing the <MdCreateNewFolder /> button in the menu
        above!
      </p>
    </Empty>
  ) : (
    <Empty>You have no favorited groups.</Empty>
  );

  return (
    <React.Fragment>
      {filteredGroups.length !== 0
        ? groupsList
        : GroupsFilterText
        ? searchEmpty
        : groupsEmpty}
    </React.Fragment>
  );
};

export default GroupList;
