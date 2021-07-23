/* Quicknotes Main Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

// Common imports
import { COLOR } from "../../common/color";

// Component imports
import Quicknote, { QuicknoteProps } from "./Quicknote";
import QNHelp from "./QNHelp";
import Searchbar from "../Searchbar";

// Image and icon imports
import { RiAddLine } from "react-icons/ri";
import { MdHelpOutline } from "react-icons/md";

export interface QuicknotesContentProps {}

/**
 * Content for the quicknotes route.
 */
const QuicknotesContent = () => {
  const [quicknotes, setQuicknotes] = useState<QuicknoteProps[]>([]);
  const local = "denote_quicknotes";

  /**
   * Effect hook to retrieve quicknotes from local storage
   */
  useEffect(() => {
    const savedQuicknotes = JSON.parse(localStorage.getItem(local) || "{}");
    // Check if notes were received
    if (savedQuicknotes) {
      setQuicknotes(savedQuicknotes);
    }
  }, []); // Run on load

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
      color: COLOR.GREY_DARK,
      body: "",
      lastModified: Date.now(),
      favorited: false,
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

  /**
   * State for quicknotes search text
   */
  const [QNSearchText, setQNSearchText] = useState("");

  let notes_list = (
    <div className="quicknotes-list">
      {quicknotes
        .filter(
          (note: any) =>
            note.title.toLowerCase().includes(QNSearchText.toLowerCase()) ||
            note.body.toLowerCase().includes(QNSearchText.toLowerCase())
        )
        .map((note: any) => (
          <Quicknote
            key={note.id}
            id={note.id}
            title={note.title}
            color={note.color}
            body={note.body}
            lastModified={note.lastModified}
            favorited={note.favorited}
            notes={quicknotes}
            currentNote={note}
            handleDeleteNote={deleteQuicknote}
            handleUpdateQuicknote={handleUpdateQuicknote}
          />
        ))}
    </div>
  );

  return (
    <React.Fragment>
      <section className="sub-header">
        <div className="sub-header-left">
          <h1>Quicknotes</h1>
        </div>
        <div className="sub-header-right">
          <Searchbar handleSearchNote={setQNSearchText} />
          <div className="sub-header-buttons">
            <ul>
              <li onClick={handleAddQuicknote} title="New Note">
                <RiAddLine />
              </li>
              <li onClick={openQNHelp} title="Help">
                <MdHelpOutline />
              </li>
            </ul>
          </div>
        </div>
      </section>
      <div className="main-content-wrapper">
        {quicknotes.length !== 0 ? (
          notes_list
        ) : (
          <div className="empty">
            <p>You have no saved quicknotes.</p>
            <p>Create one now by pressing the + button in the menu above!</p>
          </div>
        )}
        <QNHelp showQNHelp={showQNHelp} setShowQNHelp={setShowQNHelp} />
      </div>
    </React.Fragment>
  );
};

export default QuicknotesContent;
