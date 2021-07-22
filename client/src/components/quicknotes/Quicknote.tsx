// React imports
import React, { useState, useEffect } from "react";

// Component imports
import ColorMenu from "./ColorMenu";
import ConfirmDelete from "../ConfirmDelete";

// Image and icon imports
import { TiDelete } from "react-icons/ti";
import { IoMdMenu } from "react-icons/io";

export interface QuicknoteProps {
  id: string;
  title: string;
  body: string;
  lastModified: number;
  color: string;
  notes?: QuicknoteProps[];
  handleDeleteNote?: (id: string) => void;
  setQuicknotes?: React.Dispatch<React.SetStateAction<QuicknoteProps[]>>;
  handleUpdateQuicknote?: any;
  currentNote?: any;
}

const Quicknote = ({
  id,
  title,
  body,
  lastModified,
  color,
  notes,
  handleDeleteNote,
  setQuicknotes,
  handleUpdateQuicknote,
  currentNote,
}: QuicknoteProps) => {
  // Character limits
  const titleCharLimit = 30;
  const bodyCharLimit = 300;
  let body_limit = bodyCharLimit;

  if (body) {
    body_limit -= body.length;
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
   * Function to open the color menu
   */
  const openColorMenu = () => {
    setShowColorMenu((prev) => !prev); // Toggle off and on
  };

  // Label color state
  const [labelColor, setLabelColor] = useState(currentNote.color);

  let label_color = {
    backgroundColor: labelColor,
  };

  // Quicknote Delete Menu state
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const openConfirmDelete = () => {
    setShowConfirmDelete((prev) => !prev);
  };

  return (
    <div className="quicknote">
      <div className="quicknote-header" style={label_color}>
        <input
          className="quicknote-title"
          value={title}
          placeholder="Enter a title..."
          onChange={(event) => handleEditField("title", event.target.value)}
        />
        <button onClick={openColorMenu} className="color-menu-button">
          <IoMdMenu />
        </button>
        <button
          title="Delete Note"
          className="delete-note-button"
          onClick={openConfirmDelete}
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
          <small>{new Date(lastModified).toLocaleDateString()}</small>
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
        setLabelColor={setLabelColor}
        handleEditColor={handleEditColor}
      />
      <ConfirmDelete
        noteTitle={title}
        noteId={id}
        showMenuState={showConfirmDelete}
        setShowMenuState={setShowConfirmDelete}
        handleDeleteNote={handleDeleteNote}
      />
    </div>
  );
};

export default Quicknote;
