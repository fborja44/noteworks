import { Quicknote } from "../../common/types";
import { AnyAction } from "redux";

const initialState: Quicknote[] = [];

const configReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_QUICKNOTES":
      return [...payload];
    default:
      return state;
  }
};

export default configReducer;
