// React imports
import React, { useState, useEffect } from "react";

// Common imports
import { QuickNoteT } from "../../common/types";

// Component imports
import ColorMenu from "./ColorMenu";

// Image and icon imports
import { MdDeleteForever } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

export interface QuickNoteProps {
  id: string,
  title: string,
  text: string,
  date: string,
  color: string,
  notes: QuickNoteT[],
  handleDeleteNote: (id: string) => void,
  setQuickNotes: React.Dispatch<React.SetStateAction<QuickNoteT[]>>,
}

const QuickNote = ({
  id,
  title,
  text,
  date,
  color,
  notes,
  handleDeleteNote,
  setQuickNotes,
}: QuickNoteProps) => {
  // Menu state
  const [showColorMenu, setShowColorMenu] = useState(false);

  const openColorMenu = () => {
    setShowColorMenu((prev) => !prev); // Toggle off and on
  };

  // Label color state
  const [labelColor, setLabelColor] = useState(color);

  // Update color in quicknotes state if labelColor changes
  useEffect(() => {
    // Find the note in the list, copy it, and update it
    let index = notes.findIndex((item: any) => item.id === id);
    let updatedNote: any = Object.assign({}, notes[index]); // Copys note info into an empty object
    updatedNote.color = labelColor;

    // Update state
    setQuickNotes(
      notes.map<QuickNoteT>((item: any) => {
        return item.id === updatedNote.id ? updatedNote : item;
      })
    );

    // Ignore warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labelColor]);

  let label_color = {
    backgroundColor: labelColor,
  };

  return (
    <div className="quicknote">
      <div className="quicknote-header" style={label_color}>
        <span className="quicknote-name">{title}</span>
        <button onClick={openColorMenu} className="color-menu-button">
          <RiEdit2Fill />
        </button>
      </div>
      <div className="quicknote-content">
        <span>{text}</span>
        <div className="quicknote-footer">
          <small>{date}</small>
          <button title="Delete Note" className="delete-quicknote-button" onClick={() => handleDeleteNote(id)}>
            <MdDeleteForever
              className="delete-icon"
              size="1.2em"
            />
          </button>
        </div>
      </div>
      <ColorMenu
        showColorMenu={showColorMenu}
        setShowColorMenu={setShowColorMenu}
        setLabelColor={setLabelColor}
      />
    </div>
  );
};

export default QuickNote;
