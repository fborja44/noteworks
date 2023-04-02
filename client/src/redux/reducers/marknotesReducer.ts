import { Marknote } from "../../common/types";
import { AnyAction } from "redux";

const initialState: Marknote[] = [];

const configReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_MARKNOTES":
      return [...payload];
    default:
      return state;
  }
};

export default configReducer;
