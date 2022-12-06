/* Marknote Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Common imports
import { Group, Marknote } from "../../common/types";

// Component imports
import MNComponent from "../../components/marknotes/MNComponent";

export interface MNComponentContainerProps {
  groups: Group[];
  updateGroupsList: Function;
  handleUpdateGroup: (currentGroup: Group, updatedGroup: Group) => void;
  currentNote: Marknote;
  updateMarknotesList: Function;
  handleUpdateMarknote: (noteId: string, updatedMarknote: Marknote) => void;
  handleDeleteMarknote?: (noteId: string) => void;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const MNComponentContainer: React.FC<MNComponentContainerProps> = ({
  groups,
  updateGroupsList,
  handleUpdateGroup,
  currentNote,
  updateMarknotesList,
  handleUpdateMarknote,
  handleDeleteMarknote,
  setSelectedTab,
}) => {
  // History
  const history = useHistory();

  /**
   * State for current marknote info
   */
  const [marknote, setMarknote] = useState(currentNote);

  // Group menu state
  const [showGroupMenu, setShowGroupMenu] = useState(false);

  /**
   * Function to toggle the group menu
   */
  const toggleGroupMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Prevent parent link from redirecting
    // event.preventDefault();
    // event.stopPropagation();
    // event.nativeEvent.stopImmediatePropagation();

    // Toggle display of component
    setShowGroupMenu((prev) => !prev);
  };

  // Color menu state
  const [showColorMenu, setShowColorMenu] = useState(false);

  /**
   * Function to handle changes in a marknote's field
   * @param key The field being changed
   * @param value The new value of the field
   * @param updateDate If true, updates the marknote's last modified date. [default=false]
   */
  const handleEditField = (
    key: string,
    value: string | Boolean,
    updateDate: Boolean = true
  ) => {
    let updatedNote;
    if (updateDate) {
      updatedNote = {
        ...marknote,
        [key]: value,
        lastModified: Date.now(),
      };
    } else {
      updatedNote = {
        ...marknote,
        [key]: value,
      };
    }
    setMarknote(updatedNote);
    updateMarknotesList(marknote._id, updatedNote);
    handleUpdateMarknote(marknote._id, updatedNote);
  };

  /**
   * Function to handle a change in the marknote's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: string) => {
    handleEditField("color", color, false);
  };

  /**
   * Function to toggle whether a marknote is favorited
   * Does NOT change the last modified date.
   */
  const handleFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    handleEditField("favorited", marknote.favorited ? false : true, false);
  };

  /**
   * Function to toggle the color menu
   */
  const toggleColorMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Prevent parent link from redirecting
    // event.preventDefault();
    // event.stopPropagation();
    // event.nativeEvent.stopImmediatePropagation();

    // Toggle display of component
    setShowColorMenu((prev) => !prev);
  };

  // Marknote Delete Menu state
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  /**
   * Function to toggle the confirm delete menu
   */
  const toggleConfirmDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Prevent parent link from redirecting
    // event.preventDefault();
    // event.stopPropagation();
    // event.nativeEvent.stopImmediatePropagation();

    // Toggle display of component
    setShowConfirmDelete((prev) => !prev);
  };

  return (
    <MNComponent
      key={marknote._id}
      groups={groups}
      updateGroupsList={updateGroupsList}
      handleUpdateGroup={handleUpdateGroup}
      currentNote={marknote}
      handleUpdateMarknote={handleUpdateMarknote}
      handleDeleteMarknote={handleDeleteMarknote}
      handleEditField={handleEditField}
      handleFavorite={handleFavorite}
      handleEditColor={handleEditColor}
      toggleConfirmDelete={toggleConfirmDelete}
      toggleColorMenu={toggleColorMenu}
      toggleGroupMenu={toggleGroupMenu}
      showGroupMenu={showGroupMenu}
      setShowGroupMenu={setShowGroupMenu}
      showColorMenu={showColorMenu}
      setShowColorMenu={setShowColorMenu}
      showConfirmDelete={showConfirmDelete}
      setShowConfirmDelete={setShowConfirmDelete}
      setSelectedTab={setSelectedTab}
      history={history}
    />
  );
};

export default MNComponentContainer;
