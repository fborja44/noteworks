import { ChecklistItem } from "../../common/types";
import { AnyAction } from "redux";

const initialState: ChecklistItem[] = [];

const unsavedItemsReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_UNSAVED_ITEMS":
      const unsavedItems: ChecklistItem[] = payload;
      return [...unsavedItems];
    case "ADD_UNSAVED_ITEM":
      const updatedItem: ChecklistItem = payload;
      let newUnsavedItems: ChecklistItem[];
      if (!state.filter((item) => item._id === updatedItem._id).length) {
        // Item is not already saved; Add to list
        newUnsavedItems = state;
        newUnsavedItems.push(updatedItem);
      } else {
        // Item is already saved; Update in list
        newUnsavedItems = state.map((item) => {
          return item._id === updatedItem._id ? updatedItem : item;
        });
      }
      return newUnsavedItems;
    default:
      return state;
  }
};

export default unsavedItemsReducer;
