// React imports
import { React, useState, useEffect } from "react";

// Common imports
import { COLOR } from "../../common/color";

// Component imports
import ColorMenu from "./ColorMenu";

// Image and icon imports
import { MdDeleteForever } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

const QuickNote = ({
  id,
  title,
  text,
  date,
  color,
  handleDeleteNote,
  quicknotesList,
  setQuickNotes,
}) => {
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
    let index = quicknotesList.findIndex((item) => item.id === id);
    let updatedNote = Object.assign({}, quicknotesList[index]);
    updatedNote.color = labelColor;

    // Update state
    setQuickNotes(
      quicknotesList.map((item) => {
        return item.id === updatedNote.id ? updatedNote : item;
      })
    );
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
          <MdDeleteForever
            onClick={() => handleDeleteNote(id)}
            className="delete-icon"
            size="1.3em"
          />
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
