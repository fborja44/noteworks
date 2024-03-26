import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import quicknotesReducer from "./quicknotesReducer";
import marknotesReducer from "./marknotesReducer";
import groupsReducer from "./groupsReducer";
import unsavedNotesReducer from "./unsavedNotesReducer";
import unsavedItemsReducer from "./unsavedItemsReducer";
import selectedTabReducer from "./selectedTabReducer";
import checklistsReducer from "./checklistsReducer";
import connectionReducer from "./connectionReducer";
import { Checklist, ChecklistItem, Group, Marknote, Quicknote } from "../../common/types";

export interface AppState {
  searchState: string;
  selectedTabState: string;
  quicknotesState: Quicknote[],
  marknotesState: Marknote[],
  checklistsState: Checklist[],
  groupsState: Group[];
  unsavedNotesState: Quicknote[],
  unsavedItemsState: ChecklistItem[],
  connectionState: boolean;
}

const rootReducer = combineReducers({
  searchState: searchReducer,
  selectedTabState: selectedTabReducer,
  quicknotesState: quicknotesReducer,
  marknotesState: marknotesReducer,
  groupsState: groupsReducer,
  unsavedNotesState: unsavedNotesReducer,
  unsavedItemsState: unsavedItemsReducer,
  checklistsState: checklistsReducer,
  connectionState: connectionReducer,
});

export default rootReducer;
