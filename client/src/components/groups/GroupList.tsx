/* Group List Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

import styled from "@emotion/styled";

// Common imports
import { Group } from "../../common/types";

// Component imports
import GroupComponent from "./GroupComponent";

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

export interface GroupListProps {
  groups: Group[];
}

const GroupList: React.FC<GroupListProps> = ({ groups }) => {
  const groupsList = (
    <List>
      {groups.map((group) => (
        <GroupComponent key={group.id} currentGroup={group} />
      ))}
    </List>
  );

  const groupsEmpty = (
    <Empty>
      <p>You have no groups.</p>
      <p>
        Create one now by pressing the <MdCreateNewFolder /> button in the menu above!
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
