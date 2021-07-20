// React imports
import React, { useState, useEffect } from "react";

// Image and icon imports
import { MdDeleteForever } from "react-icons/md";
export interface MarkNoteProps {}

const MarkNote = ({}: MarkNoteProps) => {
  return (
    <div className="marknote">
      <div className="marknote-header">
        <span className="marknote-name">Title</span>
      </div>
      <div className="marknote-content">
        <span>Content</span>
        <div className="marknote-footer">
          <small>7/19/2021</small>
        </div>
      </div>
    </div>
  );
};

export default MarkNote;
