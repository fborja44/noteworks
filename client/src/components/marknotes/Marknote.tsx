// React imports
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Component imports
import ColorMenu from "../quicknotes/ColorMenu";
import ConfirmDelete from "../ConfirmDelete";

// Image and icon imports
import { TiDelete } from "react-icons/ti";
import { IoMdMenu } from "react-icons/io";

export interface MarknoteProps {
  id: string;
  title: string;
  color: string;
  body: string;
  lastModified: number;
  handleUpdateMarknote?: (
    currentMarknote: MarknoteProps,
    updatedMarknote: any
  ) => void;
  handleDeleteMarknote?: (noteId: any) => void;
  currentNote?: any;
}

const Marknote = ({
  id,
  title,
  color,
  body,
  lastModified,
  handleUpdateMarknote,
  handleDeleteMarknote,
  currentNote,
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
   */
  const toggleColorMenu = () => {
    setShowColorMenu((prev) => !prev); // Toggle off and on
  };

  // Marknote Delete Menu state
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  /**
   * Function to toggle the confirm delete menu
   */
  const toggleConfirmDelete = () => {
    setShowConfirmDelete((prev) => !prev);
  };

  return (
    <div className="marknote">
      <div
        className="marknote-header"
        style={{ backgroundColor: currentNote.color }}
      >
        <span className="marknote-name">
          {title.trim().length !== 0 ? (
            title
          ) : (
            <span className="italic">Untitled Note</span>
          )}
        </span>
        <button className="color-menu-button">
          <IoMdMenu onClick={toggleColorMenu} />
        </button>
        <button
          title="Delete Note"
          className="delete-note-button"
          onClick={toggleConfirmDelete}
        >
          <TiDelete className="delete-icon" size="1.2em" />
        </button>
      </div>
      <Link className="marknote-link" to={`/marknotes/${id}`}>
        <div className="marknote-content">
          <span>
            {body.length > 0 ? (
              body && body.substr(0, 150) + "..."
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
        noteTitle={title}
        noteId={id}
        showMenuState={showConfirmDelete}
        setShowMenuState={setShowConfirmDelete}
        handleDeleteNote={handleDeleteMarknote}
        toggleConfirmDelete={toggleConfirmDelete}
      />
    </div>
  );
};

export default Marknote;
