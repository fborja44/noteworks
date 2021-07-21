// React imports
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

// Component imports
import { MarknoteProps } from "./Marknote";

// Image and icon imports
import { IoClose } from "react-icons/io5";
import { TiStarOutline, TiStar } from "react-icons/ti";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";

export interface EditorProps {
  note: MarknoteProps;
  handleDeleteMarknote: (noteId: any) => void;
  handleUpdateMarknote: (
    currentMarknote: MarknoteProps,
    updatedMarknote: any
  ) => void;
}

const Editor = ({
  note,
  handleDeleteMarknote,
  handleUpdateMarknote,
}: EditorProps) => {
  const handleEditField = (key: string, value: string) => {
    handleUpdateMarknote(note, {
      ...note,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  return (
    <div className="editor-main">
      <section className="sub-header">
        <input
          type="text"
          className="editor-title"
          value={note.title}
          onChange={(event) => handleEditField("title", event.target.value)}
        />
        <div className="sub-header-buttons">
          <ul>
            <li>
              <RiEdit2Line />
            </li>
            <li>
              <Link to="/marknotes" onClick={() => handleDeleteMarknote(note.id)}>
                <MdDeleteForever />
              </Link>
            </li>
            <li>
              <TiStarOutline />
            </li>
            <li>
              <Link to="/marknotes">
                <IoClose />
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <div className="editor-content">
        <section className="editor-container">
          <textarea
            className="editor-body"
            placeholder="Write your note here!&#10;You can use markdown syntax to style your note."
            value={note.body}
            onChange={(event) => handleEditField("body", event.target.value)}
          />
        </section>
        <section className="preview-container">
          <ReactMarkdown className="preview-body">{note.body}</ReactMarkdown>
        </section>
      </div>
    </div>
  );
};

export default Editor;
