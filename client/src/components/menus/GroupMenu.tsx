/* Color Menu Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { handleUpdateGroup, handleUpdateNoteGroups } from "../../utils/groups";

// Common imports
import { Checklist, Group, Marknote, Quicknote } from "../../common/types";
import { COLOR } from "../../common/color";

// Component imports
import ModalMenu from "./ModalMenu";

// Image and icon imports
import FolderIcon from "../icons/FolderIcon";
import CheckCircleIcon from "../icons/CheckCircleIcon";
import FolderOpenIcon from "../icons/FolderOpenIcon";
import { enqueueSnackbar } from "notistack";

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
  note: Quicknote | Marknote | Checklist;
  setActiveGroup?: Function;
  showGroupMenu: boolean;
  setShowGroupMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const GroupMenu: React.FC<GroupMenuProps> = ({
  note,
  setActiveGroup,
  showGroupMenu,
  setShowGroupMenu,
}) => {
  // Dispatch hook
  const dispatch = useDispatch();

  // Groups State
  const groupsState: Group[] = useSelector((state: any) => state.groupsState);

  // Note Groups State
  const [noteGroupsState, setNoteGroupsState] = useState<string[]>(note.groups);

  /**
   * On click handler to add/remove note from group.
   * Event target needs dataset attribute.
   */
  const handleSelectGroup = async (event: any) => {
    const groupId = event.target.dataset.id;
    let data: any = null;
    try {
      data = await handleUpdateNoteGroups(dispatch, note, groupId);
      if (data) {
        if (setActiveGroup) {
          // If group page is open, update the group live so that displayed notes are updated
          setActiveGroup(data.updatedGroup);
        }
        handleUpdateGroup(dispatch, data.updatedGroup);
      }
      setNoteGroupsState(data.updatedNote.groups);
    } catch (e) {
      console.log(e);
      enqueueSnackbar("Failed to update note groups.", { variant: "error" });
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
        {groupsState.map((group, index) => (
          <GroupMenuItem
            noteGroups={noteGroupsState}
            group={group}
            last={index !== groupsState.length - 1}
            handleSelectGroup={handleSelectGroup}
          />
        ))}
      </GroupMenuContent>
    </ModalMenu>
  );
};

export default GroupMenu;

const GroupMenuItem = ({
  noteGroups,
  group,
  last,
  handleSelectGroup,
}: {
  noteGroups: string[];
  group: Group;
  last: boolean;
  handleSelectGroup: Function;
}) => {
  return (
    <GroupMenuItemContainer
      key={group._id}
      data-id={group._id}
      onClick={(event) => handleSelectGroup(event)}
      className={`${noteGroups.includes(group._id) ? "selected" : ""} ${
        last ? "border" : ""
      }`}
    >
      <GroupMenuItemTitle iconColor={COLOR[group.color].primary}>
        {noteGroups.includes(group._id) ? (
          <FolderOpenIcon filled />
        ) : (
          <FolderIcon />
        )}
        {(group.title && <span>{group.title.slice(0, 28) + "..."}</span>) || (
          <span className="italic">Untitled Group</span>
        )}
      </GroupMenuItemTitle>
      {noteGroups.includes(group._id) ? (
        <CheckCircleIcon className="selected-icon" />
      ) : null}
    </GroupMenuItemContainer>
  );
};
