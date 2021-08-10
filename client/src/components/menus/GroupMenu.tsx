/* Color Menu Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { COLOR } from "../../common/color";
import { Group, Marknote, Quicknote } from "../../common/types";

// Component imports
import ModalMenu from "./ModalMenu";
import GroupList from "../groups/GroupList";

// Image and icon imports
import { MdFolder } from "react-icons/md";

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
  }

  & > div:nth-child(even) {
    background: #f0f0f0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const GroupMenuItem = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 1em;
  border-radius: 3px;

  &.selected {
    color: white;
    background: ${COLOR.GREY_DARK};
  }

  &:hover {
    color: white;
    background: ${(props) =>
      props.theme.id === "light"
        ? COLOR.GREY_DARK_LIGHT
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
  handleUpdateGroup,
}) => {
  /**
   * Function to handle changes in a note's field.
   * @param key The field being changed
   * @param value The new value of the field
   * @param updateDate If true, updates the note's last modified date. [default=false]
   */
  const handleEditField = (
    group: Group,
    key: string,
    value: any,
    updateDate: Boolean = true
  ) => {
    if (updateDate) {
      handleUpdateGroup(group, {
        ...group,
        [key]: value,
        lastModified: Date.now(),
      });
    } else {
      handleUpdateGroup(group, {
        ...group,
        [key]: value,
      });
    }
  };

  /**
   * On click handler to add/remove note from group.
   * Event target needs dataset attribute.
   */
  const handleClick = (event: any) => {
    const groupId = event.target.dataset.id;
    const group = groups.filter((group) => group.id === groupId)[0];

    if (item.type === "marknote") {
      handleEditField(
        group,
        "marknotes",
        (group.marknotes = [...group.marknotes, item.id])
      );
    } else if (item.type === "quicknote") {
      handleEditField(
        group,
        "quicknotes",
        (group.quicknotes = [...group.quicknotes, item.id])
      );
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
            key={group.id}
            data-id={group.id}
            onClick={handleClick}
          >
            <MdFolder
              css={css`
                color: ${group.color};
              `}
            />
            {group.title}
          </GroupMenuItem>
        ))}
      </GroupMenuContent>
    </ModalMenu>
  );
};

export default GroupMenu;
