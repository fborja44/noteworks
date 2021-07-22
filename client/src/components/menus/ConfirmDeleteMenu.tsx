/* Searchbar Component
------------------------------------------------------------------------------*/
// React import
import React from "react";

// Component Imports
import ModalMenu from "./ModalMenu";

export interface ConfirmDeleteProps {
  noteTitle: string;
  noteId: string;
  showMenuState: any;
  setShowMenuState: any;
  handleDeleteNote?: (id: string) => void;
  toggleConfirmDelete: (event: any) => void;
}

const ConfirmDelete = ({
  noteTitle,
  noteId,
  showMenuState,
  setShowMenuState,
  handleDeleteNote,
  toggleConfirmDelete,
}: ConfirmDeleteProps) => {
  if (noteTitle.trim().length === 0) {
    noteTitle = "Untitled Note";
  }

  return (
    <ModalMenu
      heading={`Delete "${noteTitle}"?`}
      showMenuState={showMenuState}
      setShowMenuState={setShowMenuState}
    >
      <div className="delete-menu-text">
        <p>This action cannot be reversed.</p>
        <button
          className="delete-menu-button"
          onClick={
            handleDeleteNote
              ? (event) => {
                  handleDeleteNote(noteId);
                  toggleConfirmDelete(event);
                }
              : undefined
          }
        >
          Confirm
        </button>
      </div>
    </ModalMenu>
  );
};

export default ConfirmDelete;
