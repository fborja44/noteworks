/* Marknotes Main Content Component
------------------------------------------------------------------------------*/
// React imports
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Component imports
import Marknote, { MarknoteProps } from "./Marknote";
import Editor from "./Editor";

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
}

/**
 * Content for marknotes route
 */
const MarknotesContent = ({
  marknotes,
  setMarknotes,
}: MarknotesContentProps) => {
  return (
    <Switch>
      <Route exact path="/marknotes">
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
          <Editor note={note} />
        </Route>
      ))}
    </Switch>
  );
};

export default MarknotesContent;
