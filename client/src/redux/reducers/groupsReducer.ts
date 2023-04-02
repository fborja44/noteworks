import { Group } from "../../common/types";
import { AnyAction } from "redux";

const initialState: Group[] = [];

const configReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_GROUPS":
      return [...payload];
    default:
      return state;
  }
};

export default configReducer;
