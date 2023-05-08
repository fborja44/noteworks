import { AnyAction } from "redux";

const initialState: boolean = false;

const connectionReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_CONNECTED":
      return payload;
    default:
      return state;
  }
};

export default connectionReducer;
