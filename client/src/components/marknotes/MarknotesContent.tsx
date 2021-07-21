/* Marknotes Main Content Component
------------------------------------------------------------------------------*/
// React imports
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Component imports
import Marknote, { MarknoteProps } from "./Marknote";
import MNHelp from "./MNHelp"
import Editor from "./Editor";

// Image and icon impaorts
import { RiAddLine } from "react-icons/ri";
import { MdHelpOutline } from "react-icons/md";

export interface MarknotesContentProps {
  marknotes: MarknoteProps[];
  searchText: string;
  setMarknotes: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        title: string;
        body: string;
        lastModified: number;
      }[]
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
  searchText,
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

  return (
    <Switch>
      <Route exact path="/marknotes">
        <section className="sub-header">
          <h1>Marknotes</h1>
          <div className="sub-header-buttons shift">
            <ul>
              <li onClick={handleAddMarknote} title="New Note">
                <RiAddLine />
              </li>
              <li onClick={openMNHelp} title="Help">
                <MdHelpOutline />
              </li>
            </ul>
          </div>
        </section>
        <div className="main-content-wrapper">
          <div className="marknotes-list">
            {sortedMarknotes
              .filter(
                (note) =>
                  note.title.toLowerCase().includes(searchText.toLowerCase()) ||
                  note.body.toLowerCase().includes(searchText.toLowerCase())
              )
              .map((note) => (
                <Marknote
                  id={note.id}
                  title={note.title}
                  body={note.body}
                  lastModified={note.lastModified}
                />
              ))}
          </div>
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
