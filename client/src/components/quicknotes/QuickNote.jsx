// React imports
import { React } from "react";

// Image and icon imports
import { MdDeleteForever } from "react-icons/md";

const QuickNote = ({ id, text, date, handleDeleteNote }) => {
  // Get the data by destructuring props
  return (
    <div className="quicknote">
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
  );
};

export default QuickNote;
