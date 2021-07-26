/* Quicknotes Main Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";
import { nanoid } from "nanoid";

// Common imports
import { Quicknote } from "../../common/types";
import { COLOR } from "../../common/color";

// Component imports
import QNComponent from "./QNComponent";
import QNHelp from "./QNHelp";
import Searchbar from "../Searchbar";

// Image and icon imports
import { RiAddLine } from "react-icons/ri";
import { MdHelpOutline } from "react-icons/md";

export interface QNContentProps {
  quicknotes: Quicknote[];
  setQuicknotes: React.Dispatch<React.SetStateAction<any[]>>;
  handleUpdateQuicknote: (
    currentQuicknote: Quicknote,
    updatedQuicknote: Quicknote
  ) => void;
  handleDeleteQuicknote: (noteId: string) => void;
}

/**
 * Content for the quicknotes route.
 */
const QNContent = ({
  quicknotes,
  setQuicknotes,
  handleUpdateQuicknote,
  handleDeleteQuicknote,
}: QNContentProps) => {
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
      type: "quicknote",
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
   * State for quicknotes search text
   */
  const [QNSearchText, setQNSearchText] = useState("");

  // Filter notes
  const filteredQuicknotes = quicknotes.filter(
    (note: Quicknote) =>
      note.title.toLowerCase().includes(QNSearchText.toLowerCase()) ||
      note.body.toLowerCase().includes(QNSearchText.toLowerCase())
  );

  let notes_list = (
    <div className="quicknotes-list">
      {filteredQuicknotes.map((note: any) => (
        <QNComponent
          key={note.id}
          notes={quicknotes}
          currentNote={note}
          handleDeleteQuicknote={handleDeleteQuicknote}
          handleUpdateQuicknote={handleUpdateQuicknote}
        />
      ))}
    </div>
  );

  const searchEmpty = (
    <div className="empty">
      <p>{`No notes found for the search term "${QNSearchText}".`}</p>
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
              <li title="New Note">
                <button onClick={handleAddQuicknote}>
                  <RiAddLine />
                </button>
              </li>
              <li title="Help">
                <button onClick={openQNHelp}>
                  <MdHelpOutline />
                </button>
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
        {quicknotes.length !== 0 &&
          filteredQuicknotes.length === 0 &&
          searchEmpty}
        <QNHelp showQNHelp={showQNHelp} setShowQNHelp={setShowQNHelp} />
      </div>
    </React.Fragment>
  );
};

export default QNContent;
