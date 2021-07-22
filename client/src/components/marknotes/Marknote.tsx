// React imports
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Component imports
import ColorMenu from "../quicknotes/ColorMenu";

// Image and icon imports
import { MdDeleteForever } from "react-icons/md";
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
  currentNote?: any;
}

const Marknote = ({
  id,
  title,
  color,
  body,
  lastModified,
  handleUpdateMarknote,
  currentNote,
}: MarknoteProps) => {
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

  return (
    <div className="marknote">
      <div className="marknote-header" style={label_color}>
        <span className="marknote-name">
          {title.trim().length !== 0 ? (
            title
          ) : (
            <span className="italic">Untitled Note</span>
          )}
        </span>
        <button className="color-menu-button">
          <IoMdMenu onClick={openColorMenu} />
        </button>
      </div>
      <Link className="marknote-link" to={`/marknotes/${id}`}>
        <div className="marknote-content">
          <span>
            {body.length > 0 ? body && body.substr(0, 150) + "..." : <span className="italic">This note is empty.</span>}
          </span>
          <div className="marknote-footer">
            <small>Last Modifed:</small>
            <small>
              {new Date(lastModified).toLocaleDateString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        </div>
      </Link>
      <ColorMenu
        showColorMenu={showColorMenu}
        setShowColorMenu={setShowColorMenu}
        setLabelColor={setLabelColor}
        handleEditColor={handleEditColor}
      />
    </div>
  );
};

export default Marknote;
