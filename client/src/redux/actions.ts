import { Quicknote, Marknote, Group } from "../common/types";

const updateSearchAction = (updatedSearch: string) => ({
  type: "UPDATE_SEARCH",
  payload: updatedSearch,
});

const updateQuicknotesAction = (updatedQuicknotes: Quicknote[]) => ({
  type: "UPDATE_QUICKNOTES",
  payload: updatedQuicknotes,
});

const updateMarknotesAction = (updatedMarknotes: Marknote[]) => ({
  type: "UPDATE_MARKNOTES",
  payload: updatedMarknotes,
});

const updateGroupsAction = (updatedGroups: Group[]) => ({
  type: "UPDATE_GROUPS",
  payload: updatedGroups,
});

export {
  updateSearchAction,
  updateQuicknotesAction,
  updateMarknotesAction,
  updateGroupsAction,
};
