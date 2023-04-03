import { Quicknote } from "../../common/types";
import { AnyAction } from "redux";

const initialState: Quicknote[] = [];

const unsavedNotesReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_UNSAVED_NOTES":
      const unsavedNotes: Quicknote[] = payload;
      return [...unsavedNotes];
    case "ADD_UNSAVED_NOTE":
      const updatedNote: Quicknote = payload;
      let newUnsavedNotes: Quicknote[];
      if (!state.filter((note) => note._id === updatedNote._id).length) {
        // Note is not already saved; Add to list
        newUnsavedNotes = state;
        newUnsavedNotes.push(updatedNote);
      } else {
        // Note is already saved; Update in list
        newUnsavedNotes = state.map((note) => {
          return note._id === updatedNote._id ? updatedNote : note;
        });
      }
      return newUnsavedNotes;
    default:
      return state;
  }
};

export default unsavedNotesReducer;
