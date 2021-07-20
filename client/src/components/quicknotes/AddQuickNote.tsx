// React imports
import React, { useState } from "react";

// Image and icon imports
import { MdAddCircleOutline } from "react-icons/md";

export interface AddQuicknoteProps {
  handleAddNote: ({ noteTitle, noteText }: {
    noteTitle: string;
    noteText: string;
}) => void;
}

const AddQuicknote = ({ handleAddNote }: AddQuicknoteProps) => {
  // State hook for title
  const [noteTitle, setNoteTitle] = useState("");
  const titleCharacterLimit = 30;

  /**
   * TODO: Update event type
   */
  const handleTitleChange = (event: any) => {
    if (titleCharacterLimit - event.target.value.length >= 0) {
      setNoteTitle(event.target.value); // update state every time value of text area changes
    }
  };

  // State hook for note text
  const [noteText, setNoteText] = useState("");
  const textCharacterLimit = 200;

  /**
   * TODO: Update event type
   */
  const handleTextChange = (event: any) => {
    // Check character limit
    if (textCharacterLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value); // update state every time value of text area changes
    }
  };

  const handleSaveClick = () => {
    // Validate input
    if (noteText.trim().length > 0) {
      if (noteTitle.trim().length === 0) {
        handleAddNote({ noteTitle: "Note", noteText });
      } else {
        handleAddNote({ noteTitle, noteText });
      }

      // Reset inner text
      setNoteTitle("");
      setNoteText("");
    }
  };

  return (
    <div className="quicknote add">
      <div className="quicknote-header">
        <input
          className="quicknote-title-input"
          placeholder="Title..."
          value={noteTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div className="quicknote-content">
        <textarea
          rows={8}
          cols={10}
          placeholder="Type to add a note..."
          value={noteText}
          onChange={handleTextChange}
        ></textarea>
        <div className="quicknote-footer">
          <small>Character Limit: {textCharacterLimit - noteText.length}</small>
          <button title="Save Note" className="add-quicknote-button" onClick={handleSaveClick}>
            <MdAddCircleOutline className="add-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuicknote;
