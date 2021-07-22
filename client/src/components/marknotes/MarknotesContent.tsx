/* Marknotes Main Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { nanoid } from "nanoid";

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

export interface MarknotesContentProps {
  history?: any;
}

/**
 * Content for marknotes route
 */
const MarknotesContent = ({ history }: MarknotesContentProps) => {
  const [marknotes, setMarknotes] = useState<MarknoteProps[]>([]);
  const local = "denote_marknotes";

  /**
   * Effect hook to retrieve marknotes from local storage
   */
  useEffect(() => {
    const savedMarknotes = JSON.parse(localStorage.getItem(local) || "{}");
    // Check if notes were received
    if (savedMarknotes) {
      setMarknotes(savedMarknotes);
    }
  }, []); // Run on load

  /**
   * Effect hook to save marknotes to local storage when change is made
   */
  useEffect(() => {
    localStorage.setItem(local, JSON.stringify(marknotes));
  }, [marknotes]);

  // Redirect state
  const [redirect, setRedirect] = useState(<></>);

  /**
   * Marknote function to add a new empty marknote to the list
   */
  const handleAddMarknote = () => {
    // Add new to state list
    const newMarknote = {
      id: nanoid(),
      title: "",
      body: "",
      lastModified: Date.now(),
      color: COLOR.GREY_DARK,
    };

    setMarknotes([...marknotes, newMarknote]);

    // Redirect when new note is added
    setRedirect(<Redirect to={`/marknotes/${newMarknote.id}`} />);
  };

  /**
   * Marknote function to delete a marknote from the list
   * @param noteId The id of the marknote to be deleted
   */
  const handleDeleteMarknote = (noteId: any) => {
    // Use filter to check if id is the one we're deleting
    // If n ot, keep; Otherwise, remove
    setMarknotes(marknotes.filter((note: any) => note.id !== noteId));
  };

  /**
   * Marknote function to update a marknote in the list
   * @param currentMarknote The marknote being updated
   * @param updatedMarknote The data to update the marknote with
   */
  const handleUpdateMarknote = (
    currentMarknote: MarknoteProps,
    updatedMarknote: any
  ) => {
    const updatedMarknotesArray = marknotes.map((note: any) => {
      if (note.id === currentMarknote.id) {
        return updatedMarknote;
      }
      return note;
    });
    setMarknotes(updatedMarknotesArray);
  };

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
            key={note.id}
            id={note.id}
            title={note.title}
            color={note.color}
            body={note.body}
            lastModified={note.lastModified}
            currentNote={note}
            handleUpdateMarknote={handleUpdateMarknote}
            handleDeleteMarknote={handleDeleteMarknote}
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
          {redirect}
        </div>
        <MNHelp showMNHelp={showMNHelp} setShowMNHelp={setShowMNHelp} />
      </Route>
      {marknotes.map((note) => (
        <Route key={note.id} path={`/marknotes/${note.id}`}>
          <Editor
            note={note}
            handleDeleteMarknote={handleDeleteMarknote}
            handleUpdateMarknote={handleUpdateMarknote}
            setRedirect={setRedirect}
          />
        </Route>
      ))}
    </Switch>
  );
};

export default MarknotesContent;
