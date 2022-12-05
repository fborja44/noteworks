/* Color Menu Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { Group, Marknote, Quicknote } from "../../common/types";

// Component imports
import ModalMenu from "./ModalMenu";

// Image and icon imports
import { MdFolder } from "react-icons/md";

import axios from "axios";

const BASE_ADDR = "http://localhost:3001";

const GroupMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto 0 auto;
  border: 1px solid #828282;
  max-height: 300px;
  overflow: auto;

  & > div:nth-child(odd) {
    background: #fff;
    &.selected {
      background: #bbd0f2 !important;
    }

    &:hover {
      background: ${(props) =>
        props.theme.id === "light"
          ? "#d3e0f5"
          : props.theme.main.backgroundSecondary} !important;
      transition: background-color 0.2s ease, color 0.1s ease;
    }
  }

  & > div:nth-child(even) {
    background: #f0f0f0;
    &.selected {
      background: #a6bde3 !important;
    }

    &:hover {
      background: ${(props) =>
        props.theme.id === "light"
          ? "#d3e0f5"
          : props.theme.main.backgroundSecondary} !important;
      transition: background-color 0.2s ease, color 0.1s ease;
    }
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const GroupMenuItem = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 1em;
  display: flex;
  align-items: center;
  font-weight: 600;

  &:hover {
    background: ${(props) =>
      props.theme.id === "light"
        ? "#d3e0f5"
        : props.theme.main.backgroundSecondary} !important;
    transition: background-color 0.2s ease, color 0.1s ease;
  }
`;

export interface GroupMenuProps {
  item: Quicknote | Marknote;
  groups: Group[];
  showGroupMenu: boolean;
  setShowGroupMenu: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateGroup: (currentGroup: Group, updatedGroup: Group) => void;
}

const GroupMenu: React.FC<GroupMenuProps> = ({
  item,
  groups,
  showGroupMenu,
  setShowGroupMenu,
}) => {
  /**
   * On click handler to add/remove note from group.
   * Event target needs dataset attribute.
   */
  const handleClick = async (event: any) => {
    const groupId = event.target.dataset.id;
    if (item.type === "marknote") {
      await axios({
        baseURL: BASE_ADDR,
        url: `/groups/${groupId}/marknotes/${item._id}`,
        method: "PATCH",
      });
    } else if (item.type === "quicknote") {
      await axios({
        baseURL: BASE_ADDR,
        url: `/groups/${groupId}/quicknotes/${item._id}`,
        method: "PATCH",
      });
    }
  };

  return (
    <ModalMenu
      heading="Add/Remove Note from Groups:"
      showMenuState={showGroupMenu}
      setShowMenuState={setShowGroupMenu}
    >
      <GroupMenuContent>
        {groups.map((group) => (
          <GroupMenuItem
            key={group._id}
            data-id={group._id}
            onClick={handleClick}
            className={`${
              item.groups.includes(group._id)
                ? "selected"
                : ""
            }`}
          >
            <MdFolder
              css={css`
                color: ${group.color};
                font-size: 18px;
                margin-right: 0.7em;
              `}
            />
            {group.title || <span className="italic">Untitled Group</span>}
          </GroupMenuItem>
        ))}
      </GroupMenuContent>
    </ModalMenu>
  );
};

export default GroupMenu;