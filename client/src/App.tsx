/* Main App Component
------------------------------------------------------------------------------*/
// React imports
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { nanoid } from "nanoid";

// Common imports
import { COLOR } from "./common/color";

// Component imports
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Note, { QuickNoteProps } from "./components/quicknotes/QuickNote";
import AddNote from "./components/quicknotes/AddQuickNote";

import MarkNote, { MarkNoteProps } from "./components/marknotes/MarkNote";
import Editor from "./components/marknotes/Editor";

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
  const [quicknotes, setQuickNotes] = useState<QuickNoteProps[]>([]);
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
    const newQuickNote: QuickNoteProps = {
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
      (note: QuickNoteProps) => note.id !== id
    ); // don't need to make new array since filter returns new array
    setQuickNotes(newQuickNotes);
  };

  return (
    <div className="quicknotes-list">
      {/** Pass in note data as props with map function */}
      {quicknotes
        .filter((note) => note.text.toLowerCase().includes(searchText))
        .map((note) => (
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

export interface MarknotesContentProps {
  marknotes: MarkNoteProps[];
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
        <div className="marknotes-list">
          {marknotes.map((note) => (
            <MarkNote
              id={note.id}
              title={note.title}
              body={note.body}
              lastModified={note.lastModified}
            />
          ))}
        </div>
      </Route>
      {marknotes.map((note) => (
        <Route path={`/marknotes/${note.id}`}>
          <Editor />
        </Route>
      ))}
    </Switch>
  );
};

/**
 * Main application component
 */
const App = () => {
  // Search state hook
  const [searchText, setSearchText] = useState("");

  const [marknotes, setMarknotes] = useState([
    {
      id: nanoid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    },
  ]);

  return (
    <div className="App">
      <Header handleSearchNote={setSearchText} />
      <Router>
        <div className="app-container">
          <Sidebar />
          <Switch>
            <Route path="/quicknotes">
              <main>
                <div className="main-content-wrapper">
                  <QuicknotesContent searchText={searchText} />
                </div>
              </main>
            </Route>
            <Route path="/marknotes">
              <main>
                <div className="main-content-wrapper">
                  <MarknotesContent
                    marknotes={marknotes}
                    setMarknotes={setMarknotes}
                  />
                </div>
              </main>
            </Route>
            <Route path="/settings">
              <main>
                <div className="main-content-wrapper">
                  <div>Settings</div>
                </div>
              </main>
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
