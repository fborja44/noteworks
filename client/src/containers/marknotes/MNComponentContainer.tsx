/* Marknote Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Common imports
import { Marknote } from "../../common/types";

// Component imports
import MNComponent from "../../components/marknotes/MNComponent";

export interface MNComponentContainerProps {
  currentNote: Marknote;
  handleUpdateMarknote?: (
    currentMarknote: Marknote,
    updatedMarknote: Marknote
  ) => void;
  handleDeleteMarknote?: (noteId: string) => void;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const MNComponentContainer: React.FC<MNComponentContainerProps> = ({
  currentNote,
  handleUpdateMarknote,
  handleDeleteMarknote,
  setSelectedTab,
}) => {
  // Menu state
  const [showColorMenu, setShowColorMenu] = useState(false);

  /**
   * Function to handle changes in a note's field
   * @param key The field being changed
   * @param value The new value of the field
   * @param updateDate If true, updates the note's last modified date. [default=false]
   */
  const handleEditField = (
    key: string,
    value: string | Boolean,
    updateDate: Boolean = true
  ) => {
    if (handleUpdateMarknote)
      if (updateDate) {
        handleUpdateMarknote(currentNote, {
          ...currentNote,
          [key]: value,
          lastModified: Date.now(),
        });
      } else {
        handleUpdateMarknote(currentNote, {
          ...currentNote,
          [key]: value,
        });
      }
  };

  /**
   * Function to handle a change in the note's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: string) => {
    handleEditField("color", color, false);
  };

  /**
   * Function to toggle whether a note is favorited
   * Does NOT change the last modified date.
   */
  const handleFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    handleEditField("favorited", currentNote.favorited ? false : true, false);
  };

  /**
   * Function to toggle the color menu
   */
  const toggleColorMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Prevent parent link from redirecting
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

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
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    // Toggle display of component
    setShowConfirmDelete((prev) => !prev);
  };

  return (
    <MNComponent
      key={currentNote.id}
      currentNote={currentNote}
      handleUpdateMarknote={handleUpdateMarknote}
      handleDeleteMarknote={handleDeleteMarknote}
      handleFavorite={handleFavorite}
      handleEditColor={handleEditColor}
      toggleConfirmDelete={toggleConfirmDelete}
      toggleColorMenu={toggleColorMenu}
      showColorMenu={showColorMenu}
      setShowColorMenu={setShowColorMenu}
      showConfirmDelete={showConfirmDelete}
      setShowConfirmDelete={setShowConfirmDelete}
      setSelectedTab={setSelectedTab}
    />
  );
};

export default MNComponentContainer;
