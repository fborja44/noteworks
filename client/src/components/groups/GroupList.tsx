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
  grid-template-columns: repeat(auto-fit, 180px);
  grid-auto-rows: fit-content;
  max-width: 100vw;
  row-gap: 1rem;
  column-gap: 1rem;
  z-index: 1;
`;

export interface GroupListProps {
  groups: Group[];
  updateGroupsList: Function;
  handleUpdateGroup: (groupId: string, updatedGroup: Group) => void;
  handleDeleteGroup: (groupId: string) => void;
  favorites?: boolean;
}

const GroupList: React.FC<GroupListProps> = ({
  groups,
  updateGroupsList,
  handleUpdateGroup,
  handleDeleteGroup,
  favorites,
}) => {
  if (favorites) {
    groups = groups.filter((group) => group.favorited);
  }

  const groupsList = (
    <List>
      {groups.map((group) => (
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

  const groupsEmpty = favorites ? (
    <Empty>You have no favorited groups.</Empty>
  ) : (
    <Empty>
      <p>You have no groups.</p>
      <p>
        Create one now by pressing the <MdCreateNewFolder /> button in the menu
        above!
      </p>
    </Empty>
  );

  return (
    <React.Fragment>
      {groups.length !== 0 ? groupsList : groupsEmpty}
    </React.Fragment>
  );
};

export default GroupList;
