/* Checklist Component
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
import { handleUpdateChecklist } from "../../utils/checklists";

// Common imports
import { Checklist } from "../../common/types";
import { COLOR, ColorId } from "../../common/color";

// Component imports
import FavoriteButton from "../notes/FavoriteButton";
import MenuButton from "../notes/MenuButton";
import ColorMenu from "../menus/ColorMenu";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";
import GroupMenu from "../menus/GroupMenu";

// Image and icon imports
import DocumentCheckIcon from "../icons/DocumentCheckIcon";
import CheckCircleIcon from "../icons/CheckCircleIcon";

const ChecklistContainer = styled.div`
  background-color: ${(props) => props.theme.note.background};
  color: ${(props) => props.theme.title.textPrimary};
  display: flex;
  flex-direction: column;
  margin: 0 10px 0 10px;
  width: 215px;
  height: 69px;
  justify-self: center;
  font-size: 13px;
  font-family: "Source Sans Pro", sans-serif !important;
  border: 1px solid ${(props) => props.theme.note.borderColor};
  border-radius: 5px;

  &:hover {
    border: 1px solid #26a7fd;
  }
`;

const ChecklistContent = styled.div`
  display: flex;
  align-items: center;
  color: inherit;
  justify-content: space-between;
  height: 100%;
  padding: 0 0.75rem;
  position: relative;
`;

const ChecklistContentSection = styled.div`
  display: flex;
  align-items: center;
  color: inherit;
`;

const ChecklistName = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => props.theme.note.textSecondary} !important;
`;

const ChecklistLink = css`
  text-decoration: none;
  position: absolute;
  width: 215px;
  height: 72px;
  z-index: 1;
`;

const ChecklistItemCounter = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  svg {
    width: 16px;
    height: 16px;
    margin-right: 0.875em;
  }
`;

export interface ChecklistComponentProps {
  currentChecklist: Checklist;
  setActiveGroup?: Function;
}

const ChecklistComponent: React.FC<ChecklistComponentProps> = ({
  currentChecklist,
  setActiveGroup,
}) => {
  // Firebase user context hook
  const currentUser = useContext(AuthContext);

  // Dispatch hook
  const dispatch = useDispatch();

  /**
   * State for current checklist info
   */
  const [checklistState, setChecklistState] =
    useState<Checklist>(currentChecklist);

  /**
   * Function to toggle whether a checklist is favorited
   * Does NOT change the last modified date.
   */
  const handleFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    if (!currentUser) {
      console.log("Error: Unauthorized action.");
      return;
    }
    const updatedChecklist = {
      ...currentChecklist,
      favorited: !checklistState.favorited,
    };
    setChecklistState(updatedChecklist);
    handleUpdateChecklist(dispatch, updatedChecklist, currentUser);
  };

  const appTheme = useTheme();

  // Color menu state
  const [showColorMenu, setShowColorMenu] = useState(false);

  /**
   * Function to handle a change in the note's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: ColorId) => {
    if (!currentUser) {
      console.log("Error: Unauthorized action.");
      return;
    }
    const updatedChecklist = {
      ...currentChecklist,
      color: color,
    };
    setChecklistState(updatedChecklist);
    handleUpdateChecklist(dispatch, updatedChecklist, currentUser);
  };

  /**
   * Function to toggle the color menu
   */
  const toggleColorMenu = () => {
    // Toggle display of component
    setShowColorMenu((prev) => !prev);
  };

  // Checklist Delete Menu state
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  /**
   * Function to toggle the confirm delete menu
   */
  const toggleConfirmDelete = () => {
    setShowConfirmDelete((prev) => !prev);
  };

  // Group Menu state
  const [showGroupMenu, setShowGroupMenu] = useState(false);

  /**
   * Function to toggle the confirm delete menu
   */
  const toggleGroupMenu = () => {
    setShowGroupMenu((prev) => !prev);
  };

  const title =
    checklistState.title.trim() && checklistState.title.length > 20
      ? checklistState.title.slice(0, 20) + "..."
      : checklistState.title;

  const items_length = checklistState.items.length;
  let completed_count = 0;
  for (const item of checklistState.items) {
    if (item.checked) {
      completed_count++;
    }
  }

  return (
    <React.Fragment>
      <ChecklistContainer>
        <Link css={ChecklistLink} to={`/checklists/${checklistState._id}`} />
        <ChecklistContent>
          <ChecklistContentSection>
            <FavoriteButton
              favorited={checklistState.favorited}
              onClick={handleFavorite}
              color={appTheme.main.textPrimary}
            />
            <DocumentCheckIcon
              filled
              css={css`
                color: ${COLOR[checklistState.color].primary};
                width: 16px;
                height: 16px;
                margin: 0 0.75em;
              `}
            />
            <ChecklistName>
              {checklistState.title.trim() ? (
                <span>{title}</span>
              ) : (
                <span className="italic">Untitled Checklist</span>
              )}
            </ChecklistName>
          </ChecklistContentSection>
          <ChecklistContentSection>
            <MenuButton
              item={checklistState}
              toggleGroupMenu={toggleGroupMenu}
              toggleColorMenu={toggleColorMenu}
              toggleConfirmDelete={toggleConfirmDelete}
            />
          </ChecklistContentSection>
        </ChecklistContent>
        <ChecklistContent>
          {items_length !== 0 ? (
            <ChecklistItemCounter>
              <CheckCircleIcon />{" "}
              <span
                css={css`
                  ${completed_count === items_length &&
                  `color: ${COLOR.green.primary}`}
                `}
              >
                {completed_count} of {items_length} completed
              </span>
            </ChecklistItemCounter>
          ) : (
            <ChecklistItemCounter
              css={css`
                font-style: italic;
              `}
            >
              No checklist items.
            </ChecklistItemCounter>
          )}
        </ChecklistContent>
      </ChecklistContainer>
      <GroupMenu
        note={currentChecklist}
        setActiveGroup={setActiveGroup}
        showGroupMenu={showGroupMenu}
        setShowGroupMenu={setShowGroupMenu}
      />
      <ColorMenu
        showColorMenu={showColorMenu}
        setShowColorMenu={setShowColorMenu}
        handleEditColor={handleEditColor}
      />
      <ConfirmDelete
        item={checklistState}
        showMenuState={showConfirmDelete}
        setShowMenuState={setShowConfirmDelete}
        toggleConfirmDelete={toggleConfirmDelete}
        redirect={false}
      />
    </React.Fragment>
  );
};

export default ChecklistComponent;
