// React imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Component imports
import { MarknoteProps } from "./Marknote";

// Image and icon imports
import { IoClose } from "react-icons/io5";
import { TiStarOutline, TiStar } from "react-icons/ti";
import { RiEdit2Line } from "react-icons/ri";

export interface EditorProps {
  note: MarknoteProps;
}

const Editor = ({ note }: EditorProps) => {
  return (
    <div>
      <section className="editor-header">
        <h1>{note.title}</h1>
        <div className="editor-header-buttons">
          <ul>
            <li>
              <RiEdit2Line />
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
    </div>
  );
};

export default Editor;
