/* Marknote Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Common imports
import { Marknote } from "../../common/types";

// Component imports
import ColorMenu from "../menus/ColorMenu";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";

// Image and icon imports
import { TiDelete, TiStarOutline, TiStar } from "react-icons/ti";
import { IoMdMenu } from "react-icons/io";

export interface MNComponentProps {
  currentNote: Marknote;
  handleUpdateMarknote?: (
    currentMarknote: Marknote,
    updatedMarknote: Marknote
  ) => void;
  handleDeleteMarknote?: (noteId: string) => void;
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

const MNComponent = ({
  currentNote,
  handleUpdateMarknote,
  handleDeleteMarknote,
  handleFavorite,
  handleEditColor,
  toggleConfirmDelete,
  toggleColorMenu,
  showColorMenu,
  setShowColorMenu,
  showConfirmDelete,
  setShowConfirmDelete,
  setSelectedTab,
}: MNComponentProps) => {
  return (
    <div className="marknote">
      <Link
        className="marknote-link"
        to={`/marknotes/${currentNote.id}`}
        onClick={() => setSelectedTab("/marknotes")}
      >
        <div
          className="marknote-header note-header"
          style={{ backgroundColor: currentNote.color }}
        >
          {handleUpdateMarknote && (
            <button
              title="Favorite"
              className="favorite-note-button note-button"
              onClick={(event) => handleFavorite(event)}
            >
              {currentNote.favorited ? <TiStar /> : <TiStarOutline />}
            </button>
          )}
          <span className="marknote-name note-name">
            {currentNote.title.trim().length !== 0 ? (
              currentNote.title
            ) : (
              <span className="italic">Untitled Note</span>
            )}
          </span>
          {handleUpdateMarknote && (
            <button
              title="Options"
              className="color-menu-button note-button"
              onClick={toggleColorMenu}
            >
              <IoMdMenu />
            </button>
          )}
          {handleDeleteMarknote && (
            <button
              title="Delete Note"
              className="delete-note-button note-button"
              onClick={toggleConfirmDelete}
            >
              <TiDelete className="delete-icon" size="1.2em" />
            </button>
          )}
        </div>
        <div className="marknote-content note-content">
          <span className="note-body">
            {currentNote.body.length > 0 ? (
              currentNote.body
            ) : (
              <span className="italic">This note is empty.</span>
            )}
          </span>
          <div className="marknote-footer note-footer">
            <div className="marknote-footer-left note-footer-left">
              <small>Last Modifed:</small>
            </div>
            <div className="marknote-footer-right note-footer-right">
              <small>
                {new Date(currentNote.lastModified).toLocaleDateString(
                  "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </small>
            </div>
          </div>
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
