/* Marknotes Main Content Component
------------------------------------------------------------------------------*/
// React imports
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Common imports
import { COLOR } from "../../common/color";

// Component imports
import Marknote, { MarknoteProps } from "./Marknote";
import MNHelp from "./MNHelp";
import Editor from "./Editor";
import Searchbar from "../Searchbar";

// Image and icon impaorts
import { RiAddLine } from "react-icons/ri";
import { MdHelpOutline } from "react-icons/md";
import ColorMenu from "../quicknotes/ColorMenu";

export interface MarknotesContentProps {
  marknotes: MarknoteProps[];
  setMarknotes: React.Dispatch<
    React.SetStateAction<
      MarknoteProps[]
    >
  >;
  handleAddMarknote: () => void;
  handleDeleteMarknote: (noteId: any) => void;
  handleUpdateMarknote: (
    currentMarknote: MarknoteProps,
    updatedMarknote: any
  ) => void;
}

/**
 * Content for marknotes route
 */
const MarknotesContent = ({
  marknotes,
  setMarknotes,
  handleAddMarknote,
  handleDeleteMarknote,
  handleUpdateMarknote,
}: MarknotesContentProps) => {
  // Sort notes in descending order from last modifed date
  const sortedMarknotes = marknotes.sort(
    (a: any, b: any) => b.lastModified - a.lastModified
  );

  // Help menu state
  const [showMNHelp, setShowMNHelp] = useState(false);

  const openMNHelp = () => {
    setShowMNHelp((prev) => !prev);
  };

  /**
   * State for marknotes search text
   */
  const [MNSearchText, setMNSearchText] = useState("");

  let notes_list = (
    <div className="marknotes-list">
      {sortedMarknotes
        .filter(
          (note) =>
            note.title.toLowerCase().includes(MNSearchText.toLowerCase()) ||
            note.body.toLowerCase().includes(MNSearchText.toLowerCase())
        )
        .map((note) => (
          <Marknote
            id={note.id}
            title={note.title}
            color={note.color}
            body={note.body}
            lastModified={note.lastModified}
            handleUpdateMarknote={handleUpdateMarknote}
            handleDeleteMarknote={handleDeleteMarknote}
            currentNote={note}
          />
        ))}
    </div>
  );

  // TODO: Redirect to editor page when creating new marknote
  return (
    <Switch>
      <Route exact path="/marknotes">
        <section className="sub-header">
          <div className="sub-header-left">
            <h1>Marknotes</h1>
          </div>
          <div className="sub-header-right">
            <Searchbar handleSearchNote={setMNSearchText} />
            <div className="sub-header-buttons">
              <ul>
                <li onClick={handleAddMarknote} title="New Note">
                  <RiAddLine />
                </li>
                <li onClick={openMNHelp} title="Help">
                  <MdHelpOutline />
                </li>
              </ul>
            </div>
          </div>
        </section>
        <div className="main-content-wrapper">
          {marknotes.length !== 0 ? (
            notes_list
          ) : (
            <div className="empty">
              <p>You have no saved marknotes.</p>
              <p>Create one now by pressing the + button in the menu above!</p>
            </div>
          )}
        </div>
        <MNHelp showMNHelp={showMNHelp} setShowMNHelp={setShowMNHelp} />
      </Route>
      {marknotes.map((note) => (
        <Route path={`/marknotes/${note.id}`}>
          <Editor
            note={note}
            handleDeleteMarknote={handleDeleteMarknote}
            handleUpdateMarknote={handleUpdateMarknote}
          />
        </Route>
      ))}
    </Switch>
  );
};

export default MarknotesContent;
