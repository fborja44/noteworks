/* Group Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Firebase
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

// Redux imports
import { useDispatch } from "react-redux";

// Common imports
import { Group } from "../../common/types";
import { COLOR, ColorId } from "../../common/color";

// Component imports
import FavoriteButton from "../notes/FavoriteButton";
import MenuButton from "../notes/MenuButton";
import ColorMenu from "../menus/ColorMenu";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";

// Image and icon imports
import FolderIcon from "../icons/FolderIcon";
import { handleUpdateGroup } from "../../utils/groups";

const GroupContainer = styled.div`
  background-color: ${(props) => props.theme.note.background};
  color: ${(props) => props.theme.title.textPrimary};
  margin: 0 10px 0 10px;
  width: 215px;
  height: 38px;
  justify-self: center;
  font-size: 13px;
  font-family: "Source Sans Pro", sans-serif !important;
  border: 1px solid ${(props) => props.theme.note.borderColor};
  border-radius: 5px;

  &:hover {
    border: 1px solid #26a7fd;
  }
`;

const GroupContent = styled.div`
  display: flex;
  align-items: center;
  color: inherit;
  justify-content: space-between;
  height: 100%;
  padding: 0.2em 0.75rem;
  position: relative;
`;

const GroupContentSection = styled.div`
  display: flex;
  align-items: center;
  color: inherit;
`;

const GroupName = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => props.theme.note.textSecondary} !important;
`;

const GroupLink = css`
  text-decoration: none;
  position: absolute;
  width: 215px;
  height: 38px;
  z-index: 1;
`;

export interface GroupComponentProps {
  currentGroup: Group;
}

const GroupComponent: React.FC<GroupComponentProps> = ({ currentGroup }) => {
  // Firebase user context hook
  const currentUser = useContext(AuthContext);

  // Dispatch hook
  const dispatch = useDispatch();

  /**
   * State for current group info
   */
  const [groupState, setGroupState] = useState(currentGroup);

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
    if (!currentUser || currentUser.uid !== currentGroup.author_id) {
      console.log("Error: Unauthorized action.");
      return;
    }
    const updatedGroup = {
      ...currentGroup,
      favorited: !groupState.favorited,
    };
    setGroupState(updatedGroup);
    handleUpdateGroup(dispatch, updatedGroup, currentUser);
  };

  const appTheme = useTheme();

  // Color menu state
  const [showColorMenu, setShowColorMenu] = useState(false);

  /**
   * Function to handle a change in the note's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: ColorId) => {
    if (!currentUser || currentUser.uid !== currentGroup.author_id) {
      console.log("Error: Unauthorized action.");
      return;
    }
    const updatedGroup = {
      ...currentGroup,
      color: color,
    };
    setGroupState(updatedGroup);
    handleUpdateGroup(dispatch, updatedGroup, currentUser);
  };

  /**
   * Function to toggle the color menu
   */
  const toggleColorMenu = () => {
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

  const title =
    groupState.title.trim() && groupState.title.length > 20
      ? groupState.title.slice(0, 20) + "..."
      : groupState.title;

  return (
    <React.Fragment>
      <GroupContainer>
        <Link css={GroupLink} to={`/groups/${groupState._id}`} />
        <GroupContent>
          <GroupContentSection>
            <FavoriteButton
              favorited={groupState.favorited}
              onClick={handleFavorite}
              color={appTheme.main.textPrimary}
            />
            <FolderIcon
              filled
              css={css`
                color: ${COLOR[groupState.color].primary};
                width: 16px;
                height: 16px;
                margin: 0 0.75em;
              `}
            />
            <GroupName>
              {groupState.title.trim() ? (
                <span>{title}</span>
              ) : (
                <span className="italic">Untitled Group</span>
              )}
            </GroupName>
          </GroupContentSection>
          <GroupContentSection>
            <MenuButton
              item={groupState}
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
        item={groupState}
        showMenuState={showConfirmDelete}
        setShowMenuState={setShowConfirmDelete}
        toggleConfirmDelete={toggleConfirmDelete}
        redirect={false}
      />
    </React.Fragment>
  );
};

export default GroupComponent;
