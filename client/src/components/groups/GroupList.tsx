/* Group List Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

import styled from "@emotion/styled";

// Redux imports
import { useSelector } from "react-redux";

// Common imports
import { Group } from "../../common/types";

// Component imports
import GroupComponent from "./GroupComponent";
import { Empty } from "../Section";

// Image and icon imports
import FolderPlusIcon from "../icons/FolderPlusIcon";

const List = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); */
  grid-template-columns: repeat(auto-fit, 215px);
  grid-auto-rows: fit-content;
  max-width: 100vw;
  min-height: 60px;
  row-gap: 1em;
  column-gap: 2em;
  z-index: 2;
`;

export interface GroupListProps {
  GroupsFilterText?: string;
  favorites?: boolean;
}

const GroupList: React.FC<GroupListProps> = ({
  GroupsFilterText,
  favorites,
}) => {
  // Groups State
  const groupsState: Group[] = useSelector((state: any) => state.groupsState);

  let groups = groupsState;
  if (favorites) {
    groups = groups.filter((group) => group.favorited);
  }

  // Filter notes by filter text if given
  if (GroupsFilterText) {
    groups = groups.filter((group) =>
      group.title.toLowerCase().includes(GroupsFilterText.toLowerCase())
    );
  }

  const groupsList = (
    <List>
      {groups.map((group) => (
        <GroupComponent key={group._id} currentGroup={group} />
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
      <p>No groups found.</p>
      <p>
        To create a new group, use the <FolderPlusIcon /> button found in the options above.
      </p>
    </Empty>
  ) : (
    <Empty>You have no favorited groups.</Empty>
  );

  return (
    <React.Fragment>
      {groups.length !== 0
        ? groupsList
        : GroupsFilterText
        ? searchEmpty
        : groupsEmpty}
    </React.Fragment>
  );
};

export default GroupList;
