import { Marknote } from "../../common/types";
import { AnyAction } from "redux";

const initialState: Marknote[] = [];

const marknotesReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_MARKNOTES": // Sets marknotes state
      const marknotes: Marknote[] = payload;
      return [...marknotes];
    case "CREATE_MARKNOTE": // Creates a single marknote
      const newMarknote: Marknote = payload;
      return [...state, newMarknote];
    case "UPDATE_MARKNOTE": // Updates a single marknote
      const updatedMarknote: Marknote = payload;
      const updatedMarknotesState = state.map((note: Marknote) => {
        return note._id === updatedMarknote._id ? updatedMarknote : note;
      });
      return updatedMarknotesState;
    case "DELETE_MARKNOTE": // Deletes a single marknote
      const marknoteId: string = payload;
      const deletedMarknotesState = state.filter(
        (note: Marknote) => note._id !== marknoteId
      );
      return deletedMarknotesState;
    default:
      return state;
  }
};

export default marknotesReducer;
