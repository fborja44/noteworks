/* Searchbar Component
------------------------------------------------------------------------------*/
// React import
import React from "react";
import { Link } from "react-router-dom";

// Common imports
import { Quicknote, Marknote } from "../../common/types";

// Component Imports
import ModalMenu from "./ModalMenu";

export interface ConfirmDeleteProps {
  currentNote: Marknote | Quicknote;
  showMenuState: boolean;
  setShowMenuState: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteNote?: (id: string) => void;
  toggleConfirmDelete: (event: any) => void;
  redirect?: Boolean;
}

const ConfirmDelete = ({
  currentNote,
  showMenuState,
  setShowMenuState,
  handleDeleteNote,
  toggleConfirmDelete,
  redirect,
}: ConfirmDeleteProps) => {
  // Check if note title is empty
  const title =
    currentNote.title.trim().length === 0 ? "Untitled Note" : currentNote.title;

  // Check note type to determine route
  const route = currentNote.type === "marknote" ? "marknotes" : "quicknotes";

  return (
    <ModalMenu
      heading={`Delete "${title}"?`}
      showMenuState={showMenuState}
      setShowMenuState={setShowMenuState}
    >
      <div className="delete-menu-text">
        <p>This action cannot be reversed.</p>
        {redirect ? (
          <Link
            to={`/${route}`}
            className="delete-menu-button"
            onClick={
              handleDeleteNote
                ? (event) => {
                    handleDeleteNote(currentNote.id);
                    toggleConfirmDelete(event);
                  }
                : undefined
            }
          >
            Confirm
          </Link>
        ) : (
          <button
            className="delete-menu-button"
            onClick={
              handleDeleteNote
                ? (event) => {
                    handleDeleteNote(currentNote.id);
                    toggleConfirmDelete(event);
                  }
                : undefined
            }
          >
            Confirm
          </button>
        )}
      </div>
    </ModalMenu>
  );
};

export default ConfirmDelete;
