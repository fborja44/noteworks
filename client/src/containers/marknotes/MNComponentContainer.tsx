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
  handleUpdateGroup: (groupId: string, updatedGroup: Group) => void;
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
   * State for current marknoteComponent info
   */
  const [marknoteComponent, setMarknoteComponent] = useState(currentNote);

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
    let updatedNote;
    if (updateDate) {
      updatedNote = {
        ...marknoteComponent,
        [key]: value,
        lastModified: Date.now(),
      };
    } else {
      updatedNote = {
        ...marknoteComponent,
        [key]: value,
      };
    }
    setMarknoteComponent(updatedNote);
    updateMarknotesList(marknoteComponent._id, updatedNote);
    handleUpdateMarknote(marknoteComponent._id, updatedNote);
  };

  /**
   * Function to handle a change in the marknoteComponent's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: string) => {
    const updatedMarknote = {
      ...marknoteComponent,
      color: color,
    };
    setMarknoteComponent(marknoteComponent);
    handleUpdateMarknote(marknoteComponent._id, updatedMarknote);
    updateMarknotesList(marknoteComponent._id, updatedMarknote);
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
    handleUpdateMarknote(marknoteComponent._id, updatedMarknote);
    updateMarknotesList(marknoteComponent._id, updatedMarknote);
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
      key={marknoteComponent._id}
      groups={groups}
      updateGroupsList={updateGroupsList}
      handleUpdateGroup={handleUpdateGroup}
      currentNote={currentNote}
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
