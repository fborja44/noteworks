import { AnyAction } from "redux";

const initialState: string = "/";

const selectedTabReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_SELECTED_TAB":
      const selectedTab: string = payload;
      return selectedTab;
    default:
      return state;
  }
};

export default selectedTabReducer;
