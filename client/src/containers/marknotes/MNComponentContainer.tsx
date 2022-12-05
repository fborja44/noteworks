/* Marknote Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Common imports
import { Group, Marknote } from "../../common/types";

// Component imports
import MNComponent from "../../components/marknotes/MNComponent";

export interface MNComponentContainerProps {
  groups: Group[];
  handleUpdateGroup: (currentGroup: Group, updatedGroup: Group) => void;
  currentNote: Marknote;
  handleUpdateMarknote: (noteId: string, updatedMarknote: Marknote) => void;
  handleDeleteMarknote?: (noteId: string) => void;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const MNComponentContainer: React.FC<MNComponentContainerProps> = ({
  groups,
  handleUpdateGroup,
  currentNote,
  handleUpdateMarknote,
  handleDeleteMarknote,
  setSelectedTab,
}) => {
  // History
  const history = useHistory();

  /**
   * State for current note info
   */
  const [note, setNote] = useState(currentNote);

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
    if (updateDate) {
      setNote({
        ...note,
        [key]: value,
        lastModified: Date.now(),
      });
    } else {
      setNote({
        ...note,
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
    handleEditField("favorited", note.favorited ? false : true, false);
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

  useEffect(() => {
    const delayDBUpdate = setTimeout(() => {
      handleUpdateMarknote(note._id, note);
    }, 3000);

    return () => clearTimeout(delayDBUpdate);
  }, [note, handleUpdateMarknote]);

  return (
    <MNComponent
      key={note._id}
      groups={groups}
      handleUpdateGroup={handleUpdateGroup}
      currentNote={note}
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
