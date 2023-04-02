import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import quicknotesReducer from "./quicknotesReducer";
import marknotesReducer from "./marknotesReducer";
import groupsReducer from "./groupsReducer";
// import checklistsReducer from "./checklistsReducer";

const rootReducer = combineReducers({
  searchState: searchReducer,
  quicknotesState: quicknotesReducer,
  marknotesState: marknotesReducer,
  groupsState: groupsReducer,
  // checklistsState: checklistsReducer,
});

export default rootReducer;
