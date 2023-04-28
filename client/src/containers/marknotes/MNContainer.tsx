/* Marknote Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

// Firebase
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";

// Redux imports
import { useDispatch } from "react-redux";
import { handleUpdateMarknote } from "../../utils/marknotes";

// Common imports
import { Marknote } from "../../common/types";
import { ColorId } from "../../common/color";

// Component imports
import MNComponent from "../../components/marknotes/MNComponent";

export interface MNContainerProps {
  setActiveGroup?: Function;
  currentNote: Marknote;
}

const MNContainer: React.FC<MNContainerProps> = ({
  setActiveGroup,
  currentNote,
}) => {
  // Firebase user context hook
  const currentUser = useContext(AuthContext);

  // Dispatch
  const dispatch = useDispatch();

  /**
   * State for current marknote info
   */
  const [marknoteState, setMarknoteState] = useState(currentNote);

  // Group menu state
  const [showGroupMenu, setShowGroupMenu] = useState(false);

  /**
   * Function to toggle the group menu
   */
  const toggleGroupMenu = () => {
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
    if (!currentUser) {
      console.log("Error: Unauthorized action.");
      return;
    }
    let updatedMarknote: Marknote;
    if (updateDate) {
      updatedMarknote = {
        ...marknoteState,
        [key]: value,
        lastModified: Date.now(),
      };
    } else {
      updatedMarknote = {
        ...marknoteState,
        [key]: value,
      };
    }
    setMarknoteState(updatedMarknote);
    handleUpdateMarknote(dispatch, updatedMarknote, currentUser);
  };

  /**
   * Function to handle a change in the marknote's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: ColorId) => {
    if (!currentUser) {
      console.log("Error: Unauthorized action.");
      return;
    }
    const updatedMarknote = {
      ...marknoteState,
      color: color,
    };
    setMarknoteState(marknoteState);
    handleUpdateMarknote(dispatch, updatedMarknote, currentUser);
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
    if (!currentUser) {
      console.log("Error: Unauthorized action.");
      return;
    }
    const updatedMarknote = {
      ...marknoteState,
      favorited: !marknoteState.favorited,
    };
    setMarknoteState(marknoteState);
    handleUpdateMarknote(dispatch, updatedMarknote, currentUser);
  };

  /**
   * Function to toggle the color menu
   */
  const toggleColorMenu = () => {
    // Toggle display of component
    setShowColorMenu((prev) => !prev);
  };

  // Marknote Delete Menu state
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  /**
   * Function to toggle the confirm delete menu
   */
  const toggleConfirmDelete = () => {
    // Toggle display of component
    setShowConfirmDelete((prev) => !prev);
  };

  return (
    <MNComponent
      key={marknoteState._id}
      setActiveGroup={setActiveGroup}
      currentNote={currentNote}
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
    />
  );
};

export default MNContainer;
