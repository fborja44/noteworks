/* Group Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { Group } from "../../common/types";

// Component imports
import FavoriteButton from "../notes/FavoriteButton";
import MenuButton from "../notes/MenuButton";
import ColorMenu from "../menus/ColorMenu";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";

// Image and icon imports
import { MdFolder } from "react-icons/md";

const GroupContainer = styled.div`
  background-color: ${(props) => props.theme.note.background};
  margin: 0 10px 0 10px;
  width: 180px;
  height: 35px;
  justify-self: center;
  font-size: 13px;
  font-family: "Source Sans Pro", sans-serif !important;
  border: 1px solid ${(props) => props.theme.note.borderColor};
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 3px;

  &:hover {
    border: 1px solid #26a7fd;
    transition: border 0.2s ease;
  }
`;

const GroupContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0.2em 0.5rem;
  position: relative;
`;

const GroupContentSection = styled.div`
  display: flex;
  align-items: center;
`;

const GroupName = styled.div`
  margin-left: 0.4rem;
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => props.theme.note.textPrimary} !important;
`;

const GroupLink = css`
  text-decoration: none;
  position: absolute;
  width: 180px;
  height: 35px;
  z-index: 1;
`;

export interface GroupComponentProps {
  currentGroup: Group;
  handleUpdateGroup: (currentGroup: Group, updatedGroup: Group) => void;
  handleDeleteGroup: (groupId: string) => void;
}

const GroupComponent: React.FC<GroupComponentProps> = ({
  currentGroup,
  handleUpdateGroup,
  handleDeleteGroup,
}) => {
  /**
   * Function to handle changes in a note's field.
   * @param key The field being changed
   * @param value The new value of the field
   * @param updateDate If true, updates the note's last modified date. [default=false]
   */
  const handleEditField = (
    key: string,
    value: any,
    updateDate: Boolean = true
  ) => {
    if (updateDate) {
      handleUpdateGroup(currentGroup, {
        ...currentGroup,
        [key]: value,
        lastModified: Date.now(),
      });
    } else {
      handleUpdateGroup(currentGroup, {
        ...currentGroup,
        [key]: value,
      });
    }
  };

  /**
   * Function to toggle whether a group is favorited
   * Does NOT change the last modified date.
   */
  const handleFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    handleEditField("favorited", currentGroup.favorited ? false : true, false);
  };

  const appTheme = useTheme();

  // Quicknote Group Menu state
  const [showGroupMenu, setShowGroupMenu] = useState(false);

  /**
   * Function to toggle the confirm delete menu
   */
  const toggleGroupMenu = () => {
    setShowGroupMenu((prev) => !prev);
  };

  // Color menu state
  const [showColorMenu, setShowColorMenu] = useState(false);

  /**
   * Function to handle a change in the note's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: string) => {
    handleUpdateGroup(currentGroup, {
      ...currentGroup,
      color: color,
    });
  };

  /**
   * Function to toggle the color menu
   */
  const toggleColorMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Toggle display of component
    setShowColorMenu((prev) => !prev);
  };

  // Group Delete Menu state
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  /**
   * Function to toggle the confirm delete menu
   */
  const toggleConfirmDelete = () => {
    setShowConfirmDelete((prev) => !prev);
  };

  return (
    <React.Fragment>
      <GroupContainer>
        <Link css={GroupLink} to={`/groups/${currentGroup.id}`}></Link>
        <GroupContent>
          <GroupContentSection>
            <FavoriteButton
              favorited={currentGroup.favorited}
              onClick={handleFavorite}
              color={appTheme.main.textPrimary}
            />
            <MdFolder
              size="1.5em"
              css={css`
                color: ${currentGroup.color};
                position: relative;
                right: 2px;
              `}
            />
            <GroupName>
              {currentGroup.title || (
                <span className="italic">Untitled Group</span>
              )}
            </GroupName>
          </GroupContentSection>
          <GroupContentSection>
            <MenuButton
              item={currentGroup}
              toggleGroupMenu={toggleGroupMenu}
              toggleColorMenu={toggleColorMenu}
              toggleConfirmDelete={toggleConfirmDelete}
            />
          </GroupContentSection>
        </GroupContent>
      </GroupContainer>
      <ColorMenu
        showColorMenu={showColorMenu}
        setShowColorMenu={setShowColorMenu}
        handleEditColor={handleEditColor}
      />
      <ConfirmDelete
        item={currentGroup}
        showMenuState={showConfirmDelete}
        setShowMenuState={setShowConfirmDelete}
        handleDelete={handleDeleteGroup}
        toggleConfirmDelete={toggleConfirmDelete}
        redirect={true}
      />
    </React.Fragment>
  );
};

export default GroupComponent;
