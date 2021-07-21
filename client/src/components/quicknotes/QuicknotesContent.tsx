/* Quicknotes Main Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { nanoid } from "nanoid";

// Common imports
import { COLOR } from "../../common/color";

// Component imports
import Note, { QuicknoteProps } from "./Quicknote";
import AddNote from "./AddQuicknote";
import QNHelp from "./QNHelp";

// Image and icon imports
import { MdHelpOutline } from "react-icons/md";

export interface QuicknotesContentProps {
  searchText: any;
}

/**
 * Content for the quicknotes route.
 */
const QuicknotesContent = ({ searchText }: QuicknotesContentProps) => {
  const [quicknotes, setQuicknotes] = useState<QuicknoteProps[]>(
    JSON.parse(localStorage.denote_quicknotes) || []
  ); // Retirve quicknotes from local storage or use empty array
  const local = "denote_quicknotes";

  /**
   * Effect hook to save quicknotes to local storage when change is made
   */
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

  // Quicknotes Help Menu state
  const [showQNHelp, setShowQNHelp] = useState(false);

  const openQNHelp = () => {
    setShowQNHelp((prev) => !prev);
  };

  return (
    <React.Fragment>
      <section className="sub-header">
        <h1>Quicknotes</h1>
        <div className="sub-header-buttons shift">
          <ul>
            <li onClick={openQNHelp} title="Help">
              <MdHelpOutline />
            </li>
          </ul>
        </div>
      </section>
      <div className="main-content-wrapper">
        <div className="quicknotes-list">
          {/** Pass in note data as props with map function */}
          {quicknotes
            .filter(
              (note) =>
                note.title.toLowerCase().includes(searchText.toLowerCase()) ||
                note.text.toLowerCase().includes(searchText.toLowerCase())
            )
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
        <QNHelp showQNHelp={showQNHelp} setShowQNHelp={setShowQNHelp} />
      </div>
    </React.Fragment>
  );
};

export default QuicknotesContent;
