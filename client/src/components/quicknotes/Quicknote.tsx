// React imports
import React, { useState } from "react";

// Component imports
import ColorMenu from "./ColorMenu";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";

// Image and icon imports
import { TiDelete } from "react-icons/ti";
import { IoMdMenu } from "react-icons/io";

export interface QuicknoteProps {
  // Props to store quicknote data
  id: string;
  title: string;
  body: string;
  lastModified: number;
  color: string;
  
  // Props for children of QuicknotesContent
  notes?: QuicknoteProps[];
  currentNote?: any;
  handleDeleteNote?: (id: string) => void;
  handleUpdateQuicknote?: any;
}

const Quicknote = ({
  currentNote,
  handleDeleteNote,
  handleUpdateQuicknote,
}: QuicknoteProps) => {
  // Character limits
  const titleCharLimit = 30;
  const bodyCharLimit = 300;
  let body_limit = bodyCharLimit;

  if (currentNote.body) {
    body_limit -= currentNote.body.length;
  }

  /**
   * Function to handle changes in a note's field.
   * @param key The field being changed
   * @param value The new value of the field
   */
  const handleEditField = (key: string, value: string) => {
    // Check character limit
    if (
      (key === "title" && titleCharLimit - value.length >= 0) ||
      (key === "body" && bodyCharLimit - value.length >= 0)
    ) {
      handleUpdateQuicknote(currentNote, {
        ...currentNote,
        [key]: value,
        lastModified: Date.now(),
      });
    }
  };

  /**
   * Function to handle a change in the note's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: any) => {
    handleUpdateQuicknote(currentNote, {
      ...currentNote,
      color: color,
    });
  };

  // Menu state
  const [showColorMenu, setShowColorMenu] = useState(false);

  /**
   * Function to toggle the color menu
   */
  const toggleColorMenu = () => {
    setShowColorMenu((prev) => !prev); // Toggle off and on
  };

  // Quicknote Delete Menu state
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  /**
   * Function to toggle the confirm delete menu
   */
  const toggleConfirmDelete = () => {
    setShowConfirmDelete((prev) => !prev);
  };

  return (
    <div className="quicknote">
      <div className="quicknote-header" style={{backgroundColor: currentNote.color}}>
        <input
          className="quicknote-title"
          value={currentNote.title}
          placeholder="Enter a title..."
          onChange={(event) => handleEditField("title", event.target.value)}
        />
        <button onClick={toggleColorMenu} className="color-menu-button">
          <IoMdMenu />
        </button>
        <button
          title="Delete Note"
          className="delete-note-button"
          onClick={toggleConfirmDelete}
        >
          <TiDelete className="delete-icon" size="1.2em" />
        </button>
      </div>
      <div className="quicknote-content">
        <textarea
          className="quicknote-body"
          placeholder="Write your note here..."
          value={currentNote.body}
          onChange={(event) => handleEditField("body", event.target.value)}
        />
        <div className="quicknote-footer">
          <small>{new Date(currentNote.lastModified).toLocaleDateString()}</small>
          <div className="quicknote-footer-left">
            <small>
              {body_limit}/{bodyCharLimit}
            </small>
          </div>
        </div>
      </div>
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
        handleDeleteNote={handleDeleteNote}
        toggleConfirmDelete={toggleConfirmDelete}
      />
    </div>
  );
};

export default Quicknote;
