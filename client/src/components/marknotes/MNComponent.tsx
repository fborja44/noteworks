/* Marknote Component
------------------------------------------------------------------------------*/
// React imports
import * as React from "react";
import { Link } from "react-router-dom";

// Common imports
import { Marknote } from "../../common/types";

// Component imports
import ColorMenu from "../menus/ColorMenu";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";
import NoteHeader from "../notes/NoteHeader";
import MNFooter from "./MNFooter";

export interface MNComponentProps {
  currentNote: Marknote;
  handleUpdateMarknote?: (
    currentMarknote: Marknote,
    updatedMarknote: Marknote
  ) => void;
  handleDeleteMarknote?: (noteId: string) => void;
  handleEditField: (
    key: string,
    value: string | Boolean,
    updateDate?: Boolean
  ) => void;
  handleFavorite: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleEditColor: (color: string) => void;
  toggleConfirmDelete: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  toggleColorMenu: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  showColorMenu: boolean;
  setShowColorMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmDelete: boolean;
  setShowConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const MNComponent: React.FC<MNComponentProps> = ({
  currentNote,
  handleUpdateMarknote,
  handleDeleteMarknote,
  handleEditField,
  handleFavorite,
  handleEditColor,
  toggleConfirmDelete,
  toggleColorMenu,
  showColorMenu,
  setShowColorMenu,
  showConfirmDelete,
  setShowConfirmDelete,
  setSelectedTab,
}) => {
  return (
    <div className="marknote">
      <Link
        className="marknote-link"
        to={`/marknotes/${currentNote.id}`}
        onClick={() => setSelectedTab("/marknotes")}
      >
        <NoteHeader
          currentNote={currentNote}
          handleFavorite={handleFavorite}
          handleEditField={handleEditField}
          toggleColorMenu={toggleColorMenu}
          toggleConfirmDelete={toggleConfirmDelete}
        />
        <div className="marknote-content note-content">
          <span className="note-body">
            {currentNote.body.length > 0 ? (
              currentNote.body
            ) : (
              <span className="italic">This note is empty.</span>
            )}
          </span>
          <MNFooter currentNote={currentNote} />
        </div>
      </Link>
      <ColorMenu
        showColorMenu={showColorMenu}
        setShowColorMenu={setShowColorMenu}
        handleEditColor={handleEditColor}
      />
      <ConfirmDelete
        currentNote={currentNote}
        showMenuState={showConfirmDelete}
        setShowMenuState={setShowConfirmDelete}
        handleDeleteNote={handleDeleteMarknote}
        toggleConfirmDelete={toggleConfirmDelete}
      />
    </div>
  );
};

export default MNComponent;
