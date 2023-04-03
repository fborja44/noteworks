import { Marknote } from "../../common/types";
import { AnyAction } from "redux";

import axios from "axios";
import { COLOR } from "../../common/color";
import { Group } from "../../common/types";

const initialState: Marknote[] = [];

const marknotesReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_MARKNOTES": // Sets marknotes state
      let marknotes: Marknote[] = payload;
      return [...marknotes];
    case "UPDATE_MARKNOTE": // Updates a single marknote
      let updatedMarknote: Marknote = payload;
      const updatedMarknotesState = state.map((note: any) => {
        if (note._id === updatedMarknote._id) {
          return updatedMarknote;
        }
        return note;
      });
      return updatedMarknotesState;
    case "CREATE_MARKNOTE": // Creates a single marknote
      const newMarknote: Marknote = payload;
      return [...state, newMarknote];
    case "DELETE_MARKNOTE": // Deletes a single marknote
      const marknoteId: string = payload;
      const deletedMarknotesState = state.filter(
        (note: Marknote) => note._id !== marknoteId
      ); // don't need to make new array since filter returns new array
      return deletedMarknotesState;
    default:
      return state;
  }
};

export default marknotesReducer;
