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
import QNHelp from "./QNHelp";

// Image and icon imports
import { RiAddLine } from "react-icons/ri";
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
  ); // Retrieve quicknotes from local storage or use empty array
  const local = "denote_quicknotes";

  /**
   * Effect hook to save quicknotes to local storage when change is made
   */
  useEffect(() => {
    localStorage.setItem(local, JSON.stringify(quicknotes));
  }, [quicknotes]); // Run on change in notes

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

  /**
   * Function to add new empty quicknote after add quicknote button is pressed
   */
  const handleAddQuicknote = () => {
    const newQuicknote = {
      id: nanoid(),
      title: "",
      body: "",
      lastModified: Date.now(),
      color: COLOR.GREY_DARK,
    };

    setQuicknotes([...quicknotes, newQuicknote]);
  };

  /**
   * Function to update a quicknote in the list with updated information
   * @param currentQuicknote The quicknote being updated
   * @param updatedQuicknote The new information in update with
   */
  const handleUpdateQuicknote = (
    currentQuicknote: QuicknoteProps,
    updatedQuicknote: any
  ) => {
    const updatedQuicknotesArray = quicknotes.map((note: any) => {
      if (note.id === currentQuicknote.id) {
        return updatedQuicknote;
      }
      return note;
    });
    setQuicknotes(updatedQuicknotesArray);
  };

  return (
    <React.Fragment>
      <section className="sub-header">
        <h1>Quicknotes</h1>
        <div className="sub-header-buttons shift">
          <ul>
            <li onClick={handleAddQuicknote} title="New Note">
              <RiAddLine />
            </li>
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
                note.body.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((note) => (
              <Note
                id={note.id}
                currentNote={note}
                title={note.title}
                body={note.body}
                lastModified={note.lastModified}
                color={note.color}
                notes={quicknotes}
                handleDeleteNote={deleteQuicknote}
                setQuicknotes={setQuicknotes}
                handleUpdateQuicknote={handleUpdateQuicknote}
              />
            ))}
        </div>
        <QNHelp showQNHelp={showQNHelp} setShowQNHelp={setShowQNHelp} />
      </div>
    </React.Fragment>
  );
};

export default QuicknotesContent;
