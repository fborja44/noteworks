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
import { COLOR } from "../../common/color";

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
  updateQuicknotesList?: Function;
  updateMarknotesList?: Function;
  groups: Group[];
  updateGroupsList: Function;
  setGroupPage?: Function;
  showGroupMenu: boolean;
  setShowGroupMenu: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateGroup: (groupId: string, updatedGroup: Group) => void;
}

const GroupMenu: React.FC<GroupMenuProps> = ({
  item,
  updateQuicknotesList,
  updateMarknotesList,
  groups,
  updateGroupsList,
  setGroupPage,
  showGroupMenu,
  setShowGroupMenu,
  handleUpdateGroup,
}) => {
  /**
   * On click handler to add/remove note from group.
   * Event target needs dataset attribute.
   */
  const handleSelectGroup = async (event: any) => {
    const groupId = event.target.dataset.id;
    let data: any = null;
    try {
      if (item.type === "marknote" && updateMarknotesList) {
        data = await axios({
          baseURL: BASE_ADDR,
          url: `/groups/${groupId}/marknotes/${item._id}`,
          method: "PATCH",
        });
        updateMarknotesList(item._id, data.data.updatedNote);
      } else if (item.type === "quicknote" && updateQuicknotesList) {
        data = await axios({
          baseURL: BASE_ADDR,
          url: `/groups/${groupId}/quicknotes/${item._id}`,
          method: "PATCH",
        });
        updateQuicknotesList(item._id, data.data.updatedNote);
      }
      if (data) {
        if (setGroupPage) {
          setGroupPage(data.data.updatedGroup);
        }
        handleUpdateGroup(groupId, data.data.updatedGroup);
        updateGroupsList(groupId, data.data.updatedGroup);
      }
    } catch (e) {
      console.log(e);
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
            onClick={(event) => handleSelectGroup(event)}
            className={`${
              group.quicknotes.includes(item._id) ||
              group.marknotes.includes(item._id)
                ? "selected"
                : ""
            }`}
          >
            <MdFolder
              css={css`
                color: ${COLOR[group.color].primary};
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
