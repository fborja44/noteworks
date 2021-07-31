// React imports
import React, { useState } from "react";

// Common imports
import { Quicknote } from "../../common/types";

// Component imports
import ColorMenu from "../menus/ColorMenu";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";
import NoteHeader from "../notes/NoteHeader";
import QNFooter from "./QNFooter";

export interface QNComponentProps {
  // Props for children of QuicknotesContent
  notes: Quicknote[];
  currentNote: Quicknote;
  handleDeleteQuicknote?: (id: string) => void;
  handleUpdateQuicknote?: (
    currentQuicknote: Quicknote,
    updatedQuicknote: Quicknote
  ) => void;
}

const QNComponent: React.FC<QNComponentProps> = ({
  currentNote,
  handleDeleteQuicknote,
  handleUpdateQuicknote,
}) => {
  // Character limits
  const titleCharLimit = 30;
  const bodyCharLimit = 300;
  const bodyCharRemaining = bodyCharLimit - currentNote.body.length;

  /**
   * Function to handle changes in a note's field.
   * @param key The field being changed
   * @param value The new value of the field
   * @param updateDate If true, updates the note's last modified date. [default=false]
   */
  const handleEditField = (
    key: string,
    value: any,
    updateDate: Boolean = true
  ) => {
    // Check character limit
    if (
      (key === "title" && titleCharLimit - value.length < 0) ||
      (key === "body" && bodyCharLimit - value.length < 0)
    ) {
      return;
    } else {
      if (handleUpdateQuicknote) {
        if (updateDate) {
          handleUpdateQuicknote(currentNote, {
            ...currentNote,
            [key]: value,
            lastModified: Date.now(),
          });
        } else {
          handleUpdateQuicknote(currentNote, {
            ...currentNote,
            [key]: value,
          });
        }
      }
    }
  };

  /**
   * Function to handle a change in the note's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: string) => {
    handleEditField("color", color, false);
  };

  /**
   * Function to toggle whether a note is favorited
   * Does NOT change the last modified date.
   */
  const handleFavorite = () => {
    handleEditField("favorited", currentNote.favorited ? false : true, false);
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
      <NoteHeader
        currentNote={currentNote}
        handleFavorite={handleFavorite}
        handleEditField={handleEditField}
        toggleColorMenu={toggleColorMenu}
        toggleConfirmDelete={toggleConfirmDelete}
      />
      <div className="quicknote-content note-content">
        <textarea
          className="quicknote-body note-body"
          placeholder="Write your note here..."
          value={currentNote.body}
          onChange={(event) => handleEditField("body", event.target.value)}
        />
        <QNFooter
          currentNote={currentNote}
          remaining={bodyCharRemaining}
          limit={bodyCharLimit}
        />
      </div>
      <ColorMenu
        showColorMenu={showColorMenu}
        setShowColorMenu={setShowColorMenu}
        handleEditColor={handleEditColor}
      />
      <ConfirmDelete
        currentNote={currentNote}
        showMenuState={showConfirmDelete}
        setShowMenuState={setShowConfirmDelete}
        handleDeleteNote={handleDeleteQuicknote}
        toggleConfirmDelete={toggleConfirmDelete}
      />
    </div>
  );
};

export default QNComponent;
