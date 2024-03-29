import { Quicknote } from "../../common/types";
import { AnyAction } from "redux";

const initialState: Quicknote[] = [];

const quicknotesReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_QUICKNOTES":
      const quicknotes: Quicknote[] = payload;
      return [...quicknotes];
    case "CREATE_QUICKNOTE":
      const newQuicknote: Quicknote = payload;
      return [...state, newQuicknote];
    case "UPDATE_QUICKNOTES": // Updates a list of updated quicknotes
      const updatedQuicknotes = payload;
      const filteredQuicknotes: Quicknote[] = state.filter((note) => {
        for (const updatedNote of updatedQuicknotes) {
          if (note._id === updatedNote._id) {
            return false;
          }
        }
        return true;
      });
      return [...updatedQuicknotes, ...filteredQuicknotes];
    case "DELETE_QUICKNOTE":
      const quicknoteId: string = payload;
      const deletedQuicknotesState = state.filter(
        (note: Quicknote) => note._id !== quicknoteId
      );
      return deletedQuicknotesState;
    default:
      return state;
  }
};

export default quicknotesReducer;
