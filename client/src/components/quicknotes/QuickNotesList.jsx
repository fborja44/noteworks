// React imports
import { React } from "react";

// Component imports
import Note from "./QuickNote";
import AddNote from "./AddQuickNote";

const QuickNotesList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
  openColorMenu,
}) => {
  return (
    <div className="quicknotes-list">
      {/** Pass in note data as props with map function */}
      {notes.map((note) => (
        <Note
          id={note.id}
          title={note.title}
          text={note.text}
          date={note.date}
          handleDeleteNote={handleDeleteNote}
          openColorMenu={openColorMenu}
        />
      ))}
      <AddNote id="add-quicknote" handleAddNote={handleAddNote} />
    </div>
  );
};

export default QuickNotesList;
