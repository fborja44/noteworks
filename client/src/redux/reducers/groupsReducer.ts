import { Group } from "../../common/types";
import { AnyAction } from "redux";

const initialState: Group[] = [];

const groupsReducer = (state = initialState, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_GROUPS":
      const groups: Group[] = payload;
      return [...groups];
    case "CREATE_GROUP":
      const newGroup: Group = payload;
      return [...state, newGroup];
    case "UPDATE_GROUP":
      const updatedGroup: Group = payload;
      const updatedGroupsState = state.map((group: Group) => {
        return group._id === updatedGroup._id ? updatedGroup : group;
      });
      return updatedGroupsState;
    case "DELETE_GROUP":
      const groupId: string = payload;
      const deletedGroupsState = state.filter(
        (group: Group) => group._id !== groupId
      );
      return deletedGroupsState;
    default:
      return state;
  }
};

export default groupsReducer;
