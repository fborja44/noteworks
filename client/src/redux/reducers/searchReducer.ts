import { AnyAction } from "redux";

const initialState: string = "";

const searchReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_SEARCH":
      return payload;
    default:
      return state;
  }
};

export default searchReducer;
