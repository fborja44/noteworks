/* Color Menu Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Redux Imports
import { useDispatch } from "react-redux";
import { handleUpdateQuicknotesGroups } from "../../utils/quicknotes";

// Common imports
import { Group, Marknote, Quicknote } from "../../common/types";
import { COLOR } from "../../common/color";

// Component imports
import ModalMenu from "./ModalMenu";

// Image and icon imports
import FolderIcon from "../icons/FolderIcon";
import CheckCircleIcon from "../icons/CheckCircleIcon";
import FolderOpenIcon from "../icons/FolderOpenIcon";

import { handleUpdateMarknotesGroups } from "../../utils/marknotes";

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

const GroupMenuItemContainer = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 1.25em;
  display: flex;
  justify-content: space-between;

  align-items: center;
  font-weight: 600;

  .selected-icon {
    width: 18px;
    height: 18px;
    color: ${COLOR.green.primary};
  }

  &:hover {
    background: ${(props) => props.theme.sidebar.hoverColor};
  }

  &.border {
    border-bottom: 1px solid ${(props) => props.theme.title.borderColor};
  }
`;

const GroupMenuItemTitle = styled.div`
  display: flex;
  justify-content: center;
  svg {
    color: ${(props: { iconColor: string }) => props.iconColor};
    height: 20px;
    width: 20px;
    margin-right: 1em;
  }
`;

export interface GroupMenuProps {
  item: Quicknote | Marknote;
  groups: Group[];
  updateGroupsList: Function;
  setGroupPage?: Function;
  showGroupMenu: boolean;
  setShowGroupMenu: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateGroup: (groupId: string, updatedGroup: Group) => void;
}

const GroupMenu: React.FC<GroupMenuProps> = ({
  item,
  groups,
  updateGroupsList,
  setGroupPage,
  showGroupMenu,
  setShowGroupMenu,
  handleUpdateGroup,
}) => {
  const dispatch = useDispatch();

  /**
   * On click handler to add/remove note from group.
   * Event target needs dataset attribute.
   */
  const handleSelectGroup = async (event: any) => {
    const groupId = event.target.dataset.id;
    let data: any = null;
    try {
      if (item.type === "marknote") {
        data = await handleUpdateMarknotesGroups(dispatch, item._id, groupId);
      } else if (item.type === "quicknote") {
        data = await handleUpdateQuicknotesGroups(dispatch, item._id, groupId);
      }
      if (data) {
        if (setGroupPage) {
          setGroupPage(data.updatedGroup);
        }
        handleUpdateGroup(groupId, data.updatedGroup);
        updateGroupsList(groupId, data.updatedGroup);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ModalMenu
      heading="Manage Note Groups"
      icon={<FolderIcon filled />}
      showMenuState={showGroupMenu}
      setShowMenuState={setShowGroupMenu}
    >
      <p
        css={css`
          text-align: center;
          padding-bottom: 1em;
          font-size: 14px;
        `}
      >
        Add or remove this note from groups.
      </p>
      <GroupMenuContent>
        {groups.map((group, index) => (
          <GroupMenuItem
            item={item}
            group={group}
            last={index !== groups.length - 1}
            handleSelectGroup={handleSelectGroup}
          />
        ))}
      </GroupMenuContent>
    </ModalMenu>
  );
};

export default GroupMenu;

const GroupMenuItem = ({
  item,
  group,
  last,
  handleSelectGroup,
}: {
  item: Quicknote | Marknote;
  group: Group;
  last: boolean;
  handleSelectGroup: Function;
}) => {
  return (
    <GroupMenuItemContainer
      key={group._id}
      data-id={group._id}
      onClick={(event) => handleSelectGroup(event)}
      className={`${item.groups.includes(group._id) ? "selected" : ""} ${
        last ? "border" : ""
      }`}
    >
      <GroupMenuItemTitle iconColor={COLOR[group.color].primary}>
        {item.groups.includes(group._id) ? (
          <FolderOpenIcon filled />
        ) : (
          <FolderIcon />
        )}
        {(group.title && <span>{group.title.slice(0, 28) + "..."}</span>) || (
          <span className="italic">Untitled Group</span>
        )}
      </GroupMenuItemTitle>
      {item.groups.includes(group._id) ? (
        <CheckCircleIcon className="selected-icon" />
      ) : null}
    </GroupMenuItemContainer>
  );
};
