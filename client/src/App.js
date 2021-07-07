/* Main App Component
------------------------------------------------------------------------------*/
// React imports
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

// Component imports
import Header from "./components/Header";
import Footer from "./components/Footer";

import QuickNotesList from "./components/quicknotes/QuickNotesList";
import ColorMenu from "./components/quicknotes/ColorMenu";

// CSS imports
import "./css/app.css";
import "./css/quicknotes.css";

const App = () => {
  const [quicknotes, setQuickNotes] = useState([]);

  // Search hook
  const [searchText, setSearchText] = useState("");

  // Effect hook to retrieve data from local storage
  useEffect(() => {
    const savedQuickNotes = JSON.parse(
      localStorage.getItem("react-notes-app-data")
    );
    // Check if notes were received
    if (savedQuickNotes) {
      setQuickNotes(savedQuickNotes);
    }
  }, []); // Run on load

  // Save notes to local storage each time notes are updated
  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(quicknotes));
  }, [quicknotes]); // Run on change in notes

  /**
   * Adds a quick note to the quick notes list.
   * @param {*} noteTitle Title of the note
   * @param {*} noteText Text of the note
   */
  const addQuickNote = ({ noteTitle, noteText }) => {
    const date = new Date();
    const newQuickNote = {
      id: nanoid(),
      title: noteTitle,
      text: noteText,
      date: date.toLocaleDateString(),
    };

    // Add new note to end of state array
    const newQuickNotes = [...quicknotes, newQuickNote];
    setQuickNotes(newQuickNotes);
  };

  const deleteQuickNote = (id) => {
    const newQuickNotes = quicknotes.filter((note) => note.id !== id); // don't need to make new array since filter returns new array
    setQuickNotes(newQuickNotes);
  };

  const [showColorMenu, setShowColorMenu] = useState(false);

  const openColorMenu = () => {
    setShowColorMenu((prev) => !prev); // Toggle off and on
  };

  return (
    <div className="App">
      <Header handleSearchNote={setSearchText} />
      <main>
        <QuickNotesList
          notes={quicknotes.filter(
            (note) =>
              note.text.toLowerCase().includes(searchText.toLowerCase()) ||
              note.title.toLowerCase().includes(searchText.toLowerCase())
          )}
          handleAddNote={addQuickNote}
          handleDeleteNote={deleteQuickNote}
          openColorMenu={openColorMenu}
        />
      </main>
      <ColorMenu showColorMenu={showColorMenu} setShowColorMenu={setShowColorMenu} />
      <Footer />
    </div>
  );
};

export default App;
