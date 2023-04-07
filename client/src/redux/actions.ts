import { Quicknote, Marknote, Group, Checklist } from "../common/types";

/* Search Term
/***********************************/
const setSearchTerm = (searchTerm: string) => ({
  type: "SET_SEARCH_TERM",
  payload: searchTerm,
});

/* Selected Tab Term
/***********************************/
const setSelectedTab = (selectedTab: string) => ({
  type: "SET_SELECTED_TAB",
  payload: selectedTab,
});

/* Quicknotes
/***********************************/
const setQuicknotes = (quicknotes: Quicknote[]) => ({
  type: "SET_QUICKNOTES",
  payload: quicknotes,
});

const createQuicknote = (newQuicknote: Quicknote) => ({
  type: "CREATE_QUICKNOTE",
  payload: newQuicknote,
});

const updateQuicknotes = (updatedQuicknotes: Quicknote[]) => ({
  type: "UPDATE_QUICKNOTES",
  payload: updatedQuicknotes,
});

const deleteQuicknote = (quicknoteId: string) => ({
  type: "DELETE_QUICKNOTE",
  payload: quicknoteId,
});

/* Marknotes
/***********************************/
const setMarknotes = (marknotes: Marknote[]) => ({
  type: "SET_MARKNOTES",
  payload: marknotes,
});

const createMarknote = (newMarknote: Marknote) => ({
  type: "CREATE_MARKNOTE",
  payload: newMarknote,
});

const updateMarknote = (updatedMarknote: Marknote) => ({
  type: "UPDATE_MARKNOTE",
  payload: updatedMarknote,
});

const deleteMarknote = (marknoteId: string) => ({
  type: "DELETE_MARKNOTE",
  payload: marknoteId,
});

/* Checklists
/***********************************/
const setChecklists = (marknotes: Checklist[]) => ({
  type: "SET_CHECKLISTS",
  payload: marknotes,
});

const createChecklist = (newChecklist: Checklist) => ({
  type: "CREATE_CHECKLIST",
  payload: newChecklist,
});

const updateChecklist = (updatedChecklist: Checklist) => ({
  type: "UPDATE_CHECKLIST",
  payload: updatedChecklist,
});

const deleteChecklist = (marknoteId: string) => ({
  type: "DELETE_CHECKLIST",
  payload: marknoteId,
});

/* Groups
/***********************************/
const setGroups = (groups: Group[]) => ({
  type: "SET_GROUPS",
  payload: groups,
});

const createGroup = (newGroup: Group) => ({
  type: "CREATE_GROUP",
  payload: newGroup,
});

const updateGroup = (updatedGroup: Group) => ({
  type: "UPDATE_GROUP",
  payload: updatedGroup,
});

const deleteGroup = (groupId: string) => ({
  type: "DELETE_GROUP",
  payload: groupId,
});

/* unsavedNotes
/***********************************/
const setUnsavedNotes = (newUnsavedNotes: Quicknote[]) => ({
  type: "SET_UNSAVED_NOTES",
  payload: newUnsavedNotes,
});

const addUnsavedNote = (updatedNote: Quicknote) => ({
  type: "ADD_UNSAVED_NOTE",
  payload: updatedNote,
});

export {
  setSearchTerm,
  setSelectedTab,
  setQuicknotes,
  createQuicknote,
  deleteQuicknote,
  updateQuicknotes,
  setMarknotes,
  updateMarknote,
  createMarknote,
  deleteMarknote,
  setChecklists,
  updateChecklist,
  createChecklist,
  deleteChecklist,
  setGroups,
  createGroup,
  updateGroup,
  deleteGroup,
  setUnsavedNotes,
  addUnsavedNote,
};
