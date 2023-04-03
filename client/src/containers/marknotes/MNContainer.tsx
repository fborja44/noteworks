/* Marknote Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

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
  // Dispatch
  const dispatch = useDispatch();

  /**
   * State for current marknoteComponent info
   */
  const [marknoteComponent, setMarknoteComponent] = useState(currentNote);

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
   * Function to handle changes in a marknoteComponent's field
   * @param key The field being changed
   * @param value The new value of the field
   * @param updateDate If true, updates the marknoteComponent's last modified date. [default=false]
   */
  const handleEditField = (
    key: string,
    value: string | Boolean,
    updateDate: Boolean = true
  ) => {
    let updatedMarknote: Marknote;
    if (updateDate) {
      updatedMarknote = {
        ...marknoteComponent,
        [key]: value,
        lastModified: Date.now(),
      };
    } else {
      updatedMarknote = {
        ...marknoteComponent,
        [key]: value,
      };
    }
    setMarknoteComponent(updatedMarknote);
    handleUpdateMarknote(dispatch, updatedMarknote);
  };

  /**
   * Function to handle a change in the marknoteComponent's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: ColorId) => {
    const updatedMarknote = {
      ...marknoteComponent,
      color: color,
    };
    setMarknoteComponent(marknoteComponent);
    handleUpdateMarknote(dispatch, updatedMarknote);
  };

  /**
   * Function to toggle whether a marknoteComponent is favorited
   * Does NOT change the last modified date.
   */
  const handleFavorite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    const updatedMarknote = {
      ...marknoteComponent,
      favorited: !marknoteComponent.favorited,
    };
    setMarknoteComponent(marknoteComponent);
    handleUpdateMarknote(dispatch, updatedMarknote);
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
      key={marknoteComponent._id}
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
