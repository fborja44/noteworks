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
import FolderIcon from "../icons/FolderIcon";

import axios from "axios";
import CheckCircleIcon from "../icons/CheckCircleIcon";

const BASE_ADDR = "http://localhost:3001";

const GroupMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto 0 auto;
  border: 1px solid ${(props) => props.theme.title.borderColor};
  border-radius: 8px;
  max-height: 300px;
  overflow: auto;

  & > div {
    background: ${(props) => props.theme.header.backgroundSecondary};

    &:hover {
      background: ${(props) => props.theme.sidebar.hoverColor};
    }
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const GroupMenuItem = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 1.25em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  border-bottom: 1px solid ${(props) => props.theme.title.borderColor};

  &:hover {
    background: ${(props) => props.theme.sidebar.hoverColor};
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
            <div
              css={css`
                display: flex;
                justify-content: center;
              `}
            >
              <FolderIcon
                css={css`
                  color: ${COLOR[group.color].primary};
                  height: 20px;
                  width: 20px;
                  margin-right: 1em;
                `}
                filled
              />
              {(group.title && <span>{group.title.slice(0, 28) + "..."}</span>) || (
                <span className="italic">Untitled Group</span>
              )}
            </div>
            {group.quicknotes.includes(item._id) ||
            group.marknotes.includes(item._id) ? (
              <CheckCircleIcon
                css={css`
                  width: 18px;
                  height: 18px;
                  color: ${COLOR.green.primary};
                `}
              />
            ) : null}
          </GroupMenuItem>
        ))}
      </GroupMenuContent>
    </ModalMenu>
  );
};

export default GroupMenu;
