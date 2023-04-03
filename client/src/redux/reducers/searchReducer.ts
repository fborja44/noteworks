import { AnyAction } from "redux";

const initialState: string = "";

const searchReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_SEARCH_TERM":
      const searchTerm: string = payload;
      return searchTerm;
    default:
      return state;
  }
};

export default searchReducer;
