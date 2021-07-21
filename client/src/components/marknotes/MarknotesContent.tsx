/* Marknotes Main Content Component
------------------------------------------------------------------------------*/
// React imports
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Component imports
import Marknote, { MarknoteProps } from "./Marknote";
import Editor from "./Editor";

// Image and icon impaorts
import { MdAdd } from "react-icons/md";

export interface MarknotesContentProps {
  marknotes: MarknoteProps[];
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
  handleUpdateMarknote: (currentMarknote: MarknoteProps, updatedMarknote: any) => void;
}

/**
 * Content for marknotes route
 */
const MarknotesContent = ({
  marknotes,
  setMarknotes,
  handleAddMarknote,
  handleUpdateMarknote
}: MarknotesContentProps) => {
  return (
    <Switch>
      <Route exact path="/marknotes">
        <section className="sub-header">
          <h1>Marknotes</h1>
          <div className="sub-header-buttons">
            <ul>
              <li>
                <MdAdd onClick={handleAddMarknote} />
              </li>
            </ul>
          </div>
        </section>
        <div className="main-content-wrapper">
          <div className="marknotes-list">
            {marknotes.map((note) => (
              <Marknote
                id={note.id}
                title={note.title}
                body={note.body}
                lastModified={note.lastModified}
              />
            ))}
          </div>
        </div>
      </Route>
      {marknotes.map((note) => (
        <Route path={`/marknotes/${note.id}`}>
          <Editor
            note={note}
            handleUpdateMarknote={handleUpdateMarknote}
          />
        </Route>
      ))}
    </Switch>
  );
};

export default MarknotesContent;
