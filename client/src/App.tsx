/* Main App Component
------------------------------------------------------------------------------*/
// React imports
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { nanoid } from "nanoid";

// Common imports
import { COLOR } from "./common/color";
import { QuickNoteT } from "./common/types";

// Component imports
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Note from "./components/quicknotes/QuickNote";
import AddNote from "./components/quicknotes/AddQuickNote";

import MarkNote from "./components/marknotes/MarkNote";

// CSS imports
import "./css/app.css";
import "./css/quicknotes.css";
import "./css/marknotes.css";

export interface QuicknotesContentProps {
  searchText: any;
}

/**
 * Content for the quicknotes route.
 */
const QuicknotesContent = ({ searchText }: QuicknotesContentProps) => {
  const [quicknotes, setQuickNotes] = useState<QuickNoteT[]>([]);
  const local = "react-notes-app-data";

  // Effect hook to retrieve data from local storage
  useEffect(() => {
    const savedQuickNotes = JSON.parse(localStorage.getItem(local) || "{}");
    // Check if notes were received
    if (savedQuickNotes) {
      setQuickNotes(savedQuickNotes);
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
  const addQuickNote = ({
    noteTitle,
    noteText,
  }: {
    noteTitle: string;
    noteText: string;
  }) => {
    const date = new Date();
    const newQuickNote: QuickNoteT = {
      id: nanoid(),
      title: noteTitle,
      text: noteText,
      date: date.toLocaleDateString(),
      color: COLOR.RED,
    };

    // Add new note to end of state array
    const newQuickNotes = [...quicknotes, newQuickNote];
    setQuickNotes(newQuickNotes);
  };

  const deleteQuickNote = (id: string) => {
    const newQuickNotes = quicknotes.filter(
      (note: QuickNoteT) => note.id !== id
    ); // don't need to make new array since filter returns new array
    setQuickNotes(newQuickNotes);
  };

  return (
    <div className="quicknotes-list">
      {/** Pass in note data as props with map function */}
      {quicknotes.map((note) => (
        <Note
          id={note.id}
          title={note.title}
          text={note.text}
          date={note.date}
          color={note.color}
          notes={quicknotes}
          handleDeleteNote={deleteQuickNote}
          setQuickNotes={setQuickNotes}
        />
      ))}
      <AddNote handleAddNote={addQuickNote} />
    </div>
  );
};

export interface MarknotesContentProps {}

/**
 * Content for marknotes route
 */
const MarknotesContent = ({}: MarknotesContentProps) => {
  const [marknotes, setMarknotes] = useState([{}]);

  return (
    <div className="marknotes-list">
      {marknotes.map((note) => (
        <MarkNote />
      ))}
    </div>
  );
};

/**
 * Main application component
 */
const App = () => {
  // Search state hook
  const [searchText, setSearchText] = useState("");

  return (
    <div className="App">
      <Header handleSearchNote={setSearchText} />
      <Router>
        <div className="app-container">
          <Sidebar />
          <main>
            <div className="main-content-wrapper">
              <Switch>
                <Route path="/quicknotes">
                  <QuicknotesContent searchText={searchText} />
                </Route>
                <Route path="/marknotes">
                  <MarknotesContent />
                </Route>
                <Route path="/settings">
                  <div>Settings</div>
                </Route>
              </Switch>
            </div>
          </main>
        </div>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
