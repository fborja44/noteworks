/* Searchbar Component
------------------------------------------------------------------------------*/
// React import
import React, { useState, useEffect } from "react";

// Component Imports
import ModalMenu from "./ModalMenu";

export interface ConfirmDeleteProps {
  noteTitle: string;
  noteId: string;
  showMenuState: any;
  setShowMenuState: any;
  handleDeleteNote?: (id: string) => void;
  toggleConfirmDelete: () => void;
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
              ? () => {
                  handleDeleteNote(noteId);
                  toggleConfirmDelete();
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
