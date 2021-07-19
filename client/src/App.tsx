/* Main App Component
------------------------------------------------------------------------------*/
// React imports
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

// Common imports
import { COLOR } from "./common/color";
import { QuickNoteT } from "./common/types";

// Component imports
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import QuickNotesList from "./components/quicknotes/QuickNotesList";

// CSS imports
import "./css/app.css";
import "./css/quicknotes.css";

const App = () => {
  const [quicknotes, setQuickNotes] = useState<QuickNoteT[]>([]);

  // Search hook
  const [searchText, setSearchText] = useState("");

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
    <div className="App">
      <Header handleSearchNote={setSearchText} />
      <div className="app-container">
        <Sidebar />
        <main>
          <QuickNotesList
            notes={quicknotes.filter(
              (note) =>
                note.text.toLowerCase().includes(searchText.toLowerCase()) ||
                note.title.toLowerCase().includes(searchText.toLowerCase())
            )}
            handleAddNote={addQuickNote}
            handleDeleteNote={deleteQuickNote}
            setQuickNotes={setQuickNotes}
          />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
