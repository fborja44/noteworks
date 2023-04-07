import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import quicknotesReducer from "./quicknotesReducer";
import marknotesReducer from "./marknotesReducer";
import groupsReducer from "./groupsReducer";
import unsavedNotesReducer from "./unsavedNotesReducer";
import selectedTabReducer from "./selectedTabReducer";
import checklistsReducer from "./checklistsReducer";

const rootReducer = combineReducers({
  searchState: searchReducer,
  selectedTabState: selectedTabReducer,
  quicknotesState: quicknotesReducer,
  marknotesState: marknotesReducer,
  groupsState: groupsReducer,
  unsavedNotesState: unsavedNotesReducer,
  checklistsState: checklistsReducer,
});

export default rootReducer;
