import { Quicknote, Marknote, Group } from "../common/types";

const updateSearch = (updatedSearch: string) => ({
  type: "UPDATE_SEARCH",
  payload: updatedSearch,
});

const updateQuicknotes = (updatedQuicknotes: Quicknote[]) => ({
  type: "UPDATE_QUICKNOTES",
  payload: updatedQuicknotes,
});

const updateMarknotes = (updatedMarknotes: Marknote[]) => ({
  type: "UPDATE_MARKNOTES",
  payload: updatedMarknotes,
});

const updateGroups = (updatedGroups: Group[]) => ({
  type: "UPDATE_GROUPS",
  payload: updatedGroups,
});

export { updateSearch, updateQuicknotes, updateMarknotes, updateGroups };
