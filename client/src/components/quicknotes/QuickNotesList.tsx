// React imports
import React from "react";

// Common imports
import { QuickNoteT } from "../../common/types";

// Component imports
import Note from "./QuickNote";
import AddNote from "./AddQuickNote";

export interface QuickNotesListProps {
  notes: QuickNoteT[],
  handleAddNote: ({ noteTitle, noteText }: { noteTitle: string, noteText: string}) => void,
  handleDeleteNote: (id: string) => void,
  setQuickNotes: React.Dispatch<React.SetStateAction<QuickNoteT[]>>
}

const QuickNotesList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
  setQuickNotes
}: QuickNotesListProps) => {
  return (
    <div className="quicknotes-list">
      {/** Pass in note data as props with map function */}
      {notes.map((note) => (
        <Note
          id={note.id}
          title={note.title}
          text={note.text}
          date={note.date}
          color={note.color}
          notes={notes}
          handleDeleteNote={handleDeleteNote}
          setQuickNotes={setQuickNotes}
        />
      ))}
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
};

export default QuickNotesList;
