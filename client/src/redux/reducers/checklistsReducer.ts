import { Checklist } from "../../common/types";
import { AnyAction } from "redux";

const initialState: Checklist[] = [];

const checklistsReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_CHECKLISTS":
      const checklists: Checklist[] = payload;
      return [...checklists];
    case "CREATE_CHECKLIST":
      const newChecklist: Checklist = payload;
      return [...state, newChecklist];
    case "UPDATE_CHECKLIST":
      const updatedChecklist: Checklist = payload;
      const updatedChecklistsState = state.map((checklist: Checklist) => {
        return checklist._id === updatedChecklist._id
          ? updatedChecklist
          : checklist;
      });
      return updatedChecklistsState;
    case "DELETE_CHECKLIST":
      const checklistId: string = payload;
      const deletedChecklistsState = state.filter(
        (note: Checklist) => note._id !== checklistId
      );
      return deletedChecklistsState;
    default:
      return state;
  }
};

export default checklistsReducer;
