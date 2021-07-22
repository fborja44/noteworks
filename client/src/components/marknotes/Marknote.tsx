// React imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Component imports
import ColorMenu from "../menus/ColorMenu";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";

// Image and icon imports
import { TiDelete } from "react-icons/ti";
import { IoMdMenu } from "react-icons/io";

export interface MarknoteProps {
  // Props to store marknote data
  id: string;
  title: string;
  color: string;
  body: string;
  lastModified: number;

  // Props for children of MarknotesContent
  currentNote?: any;
  handleUpdateMarknote?: (
    currentMarknote: MarknoteProps,
    updatedMarknote: any
  ) => void;
  handleDeleteMarknote?: (noteId: any) => void;
}

const Marknote = ({
  lastModified,
  currentNote,
  handleUpdateMarknote,
  handleDeleteMarknote,
}: MarknoteProps) => {
  // Menu state
  const [showColorMenu, setShowColorMenu] = useState(false);

  /**
   * Function to handle a change in the note's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: any) => {
    if (handleUpdateMarknote) {
      handleUpdateMarknote(currentNote, {
        ...currentNote,
        color: color,
      });
    }
  };

  /**
   * Function to toggle the color menu
   * TODO: Change event type
   */
  const toggleColorMenu = (event: any) => {
    // Prevent parent link from redirecting
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    // Toggle display of component
    setShowColorMenu((prev) => !prev);
  };

  // Marknote Delete Menu state
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  /**
   * Function to toggle the confirm delete menu
   * TODO: Change event type
   */
  const toggleConfirmDelete = (event: any) => {
    // Prevent parent link from redirecting
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    // Toggle display of component
    setShowConfirmDelete((prev) => !prev);
  };

  return (
    <div className="marknote">
      <Link className="marknote-link" to={`/marknotes/${currentNote.id}`}>
        <div
          className="marknote-header"
          style={{ backgroundColor: currentNote.color }}
        >
          <span className="marknote-name">
            {currentNote.title.trim().length !== 0 ? (
              currentNote.title
            ) : (
              <span className="italic">Untitled Note</span>
            )}
          </span>
          <button className="color-menu-button marknote-button">
            <IoMdMenu onClick={toggleColorMenu} />
          </button>
          <button
            title="Delete Note"
            className="delete-note-button marknote-button"
            onClick={toggleConfirmDelete}
          >
            <TiDelete className="delete-icon" size="1.2em" />
          </button>
        </div>
        <div className="marknote-content">
          <span>
            {currentNote.body.length > 0 ? (
              currentNote.body && currentNote.body.substr(0, 150) + "..."
            ) : (
              <span className="italic">This note is empty.</span>
            )}
          </span>
          <div className="marknote-footer">
            <div className="marknote-footer-left">
              <small>Last Modifed:</small>
            </div>
            <div className="marknote-footer-right">
              <small>
                {new Date(lastModified).toLocaleDateString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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
        noteTitle={currentNote.title}
        noteId={currentNote.id}
        showMenuState={showConfirmDelete}
        setShowMenuState={setShowConfirmDelete}
        handleDeleteNote={handleDeleteMarknote}
        toggleConfirmDelete={toggleConfirmDelete}
      />
    </div>
  );
};

export default Marknote;
