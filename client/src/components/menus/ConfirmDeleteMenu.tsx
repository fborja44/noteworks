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
}

const ConfirmDelete = ({
  currentNote,
  showMenuState,
  setShowMenuState,
  handleDeleteNote,
  toggleConfirmDelete,
}: ConfirmDeleteProps) => {
  // Check if note title is empty
  const title =
    currentNote.title.trim().length === 0 ? "Untitled Note" : currentNote.title;

  // Check note type to determine redirect
  const redirect = currentNote.type === "marknote" ? "marknotes" : "quicknotes";

  return (
    <ModalMenu
      heading={`Delete "${title}"?`}
      showMenuState={showMenuState}
      setShowMenuState={setShowMenuState}
    >
      <div className="delete-menu-text">
        <p>This action cannot be reversed.</p>
        <Link
          to={`/${redirect}`}
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
      </div>
    </ModalMenu>
  );
};

export default ConfirmDelete;
