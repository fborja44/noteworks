/* Quicknotes Main Content Component
------------------------------------------------------------------------------*/
// React imports
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { nanoid } from "nanoid";

// Common imports
import { COLOR } from "../../common/color";

// Component imports
import Note, { QuicknoteProps } from "./Quicknote";
import AddNote from "./AddQuicknote";

export interface QuicknotesContentProps {
  searchText: any;
}

/**
 * Content for the quicknotes route.
 */
const QuicknotesContent = ({ searchText }: QuicknotesContentProps) => {
  const [quicknotes, setQuicknotes] = useState<QuicknoteProps[]>([]);
  const local = "react-notes-app-data";

  // Effect hook to retrieve data from local storage
  useEffect(() => {
    const savedQuicknotes = JSON.parse(localStorage.getItem(local) || "{}");
    // Check if notes were received
    if (savedQuicknotes) {
      setQuicknotes(savedQuicknotes);
    }
  }, []); // Run on load

  // Save notes to local storage each time notes are updated
  useEffect(() => {
    localStorage.setItem(local, JSON.stringify(quicknotes));
  }, [quicknotes]); // Run on change in notes

  /**
   * Adds a quick note to the quick notes list.
   * @param {*} noteTitle Title of the note
   * @param {*} noteText Text of the note
   */
  const addQuicknote = ({
    noteTitle,
    noteText,
  }: {
    noteTitle: string;
    noteText: string;
  }) => {
    const date = new Date();
    const newQuicknote: QuicknoteProps = {
      id: nanoid(),
      title: noteTitle,
      text: noteText,
      date: date.toLocaleDateString(),
      color: COLOR.RED,
    };

    // Add new note to end of state array
    const newQuicknotes = [...quicknotes, newQuicknote];
    setQuicknotes(newQuicknotes);
  };

  const deleteQuicknote = (id: string) => {
    const newQuicknotes = quicknotes.filter(
      (note: QuicknoteProps) => note.id !== id
    ); // don't need to make new array since filter returns new array
    setQuicknotes(newQuicknotes);
  };

  return (
    <div className="quicknotes-list">
      {/** Pass in note data as props with map function */}
      {quicknotes
        .filter((note) => note.text.toLowerCase().includes(searchText))
        .map((note) => (
          <Note
            id={note.id}
            title={note.title}
            text={note.text}
            date={note.date}
            color={note.color}
            notes={quicknotes}
            handleDeleteNote={deleteQuicknote}
            setQuicknotes={setQuicknotes}
          />
        ))}
      <AddNote handleAddNote={addQuicknote} />
    </div>
  );
};

export default QuicknotesContent;