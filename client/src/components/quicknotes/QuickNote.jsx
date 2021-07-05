// React imports
import { React } from "react";

// Image and icon imports
import { MdDeleteForever } from "react-icons/md";

const QuickNote = ({ id, text, date, handleDeleteNote }) => {
  // Get the data by destructuring props
  return (
    <div className="quicknote">
      <div className="quicknote-header"><span className="quicknote-name">Note</span></div>
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
    </div>
  );
};

export default QuickNote;
