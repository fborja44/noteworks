import axios from "axios";
import { Dispatch, AnyAction } from "redux";
import {
  setQuicknotes,
  setMarknotes,
  setChecklists,
  setGroups,
} from "../redux/actions";
import { User } from "firebase/auth";

const BASE_ADDR = "http://localhost:3001";

/**
 * Deletes all notes for a specific user.
 */
const deleteAllUserNotes = async (
  dispatch: Dispatch<AnyAction>,
  user: User
) => {
  const { data } = await axios({
    baseURL: BASE_ADDR,
    url: `/user/${user.uid}/all`,
    method: "DELETE",
  });
  const status = data.status;
  // Update notes states to empty
  if (status.quicknotes) {
    dispatch(setQuicknotes([]));
  }
  if (status.marknotes) {
    dispatch(setMarknotes([]));
  }
  if (status.checklists) {
    dispatch(setChecklists([]));
  }
  if (status.groups) {
    dispatch(setGroups([]));
  }
  return status;
};

export { deleteAllUserNotes };
