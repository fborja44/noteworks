/* Main App Component
------------------------------------------------------------------------------*/
// React imports
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

// Component imports
import Header from "./components/Header";
import Footer from "./components/Footer";

import QuickNotesList from "./components/quicknotes/QuickNotesList";

// CSS imports
import "./css/app.css";

const App = () => {
  const [quicknotes, setQuickNotes] = useState([]);

  // Search hook
  const [searchText, setSearchText] = useState("");

  // Effect hook to retrieve data from local storage
  useEffect(() => {
    const savedQuickNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
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
   * Adds a note to the list
   * @param {*} text The text that is being saved in the note
   */
  const addQuickNote = (text) => {
    const date = new Date();
    const newQuickNote = {
      id: nanoid(),
      text: text,
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

  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
};

export default App;
