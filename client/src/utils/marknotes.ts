import axios from "axios";
import { Dispatch, AnyAction } from "redux";
import { COLOR } from "../common/color";
import { Marknote } from "../common/types";
import {
  createMarknote,
  deleteMarknote,
  setMarknotes,
  updateMarknote,
} from "../redux/actions";

const BASE_ADDR = "http://localhost:3001";

/**
 * Fetches marknotes from the database.
 */
const fetchMarknotes = async (dispatch: Dispatch<AnyAction>) => {
  const { data: savedMarknotes } = await axios({
    baseURL: BASE_ADDR,
    url: "/marknotes",
    method: "GET",
  });
  // Check if notes were received
  if (savedMarknotes) {
    dispatch(setMarknotes(savedMarknotes));
  }
};

/**
 * Creates a new empty marknote.
 */
const handleCreateMarknote = async (
  dispatch: Dispatch<AnyAction>,
  history: any
) => {
  try {
    const { data: newMarknote } = await axios({
      baseURL: BASE_ADDR,
      url: "/marknotes",
      method: "POST",
      data: {
        title: "",
        color: COLOR.dark_grey.id,
        body: "",
      },
    });
    dispatch(createMarknote(newMarknote));
    // Redirect when new note is added
    history.push("/marknotes");
    history.push(`/marknotes/${newMarknote._id}`);
  } catch (e) {
    console.log(e);
  }
};

/**
 * Updates a marknote.
 * @param updatedMarknote The data to update the marknote with
 */
const handleUpdateMarknote = async (
  dispatch: Dispatch<AnyAction>,
  updatedMarknote: Marknote
) => {
  try {
    await axios({
      baseURL: BASE_ADDR,
      url: `/marknotes/${updatedMarknote._id}`,
      method: "PATCH",
      data: updatedMarknote,
    });
    dispatch(updateMarknote(updatedMarknote));
  } catch (e) {
    console.log(e);
  }
};

/**
 * Adds a group to a marknote if not a member.
 * Otherwise, removes the marknote from the group.
 * @param marknoteId The marknote id
 * @param groupid The group id
 */
const handleUpdateMarknotesGroups = async (
  dispatch: Dispatch<AnyAction>,
  marknoteId: string,
  groupId: string
) => {
  try {
    const { data } = await axios({
      baseURL: BASE_ADDR,
      url: `/groups/${groupId}/marknotes/${marknoteId}`,
      method: "PATCH",
    });
    dispatch(updateMarknote(data.updatedNote));
    return data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Deletes a marknote.
 * @param marknoteId The id of the marknote to be deleted
 */
const handleDeleteMarknote = async (
  dispatch: Dispatch<AnyAction>,
  marknoteId: string
) => {
  try {
    await axios({
      baseURL: BASE_ADDR,
      url: `/marknotes/${marknoteId}`,
      method: "DELETE",
    });
    dispatch(deleteMarknote(marknoteId));
  } catch (e) {
    console.log(e);
  }
};

export {
  fetchMarknotes,
  handleCreateMarknote,
  handleUpdateMarknote,
  handleUpdateMarknotesGroups,
  handleDeleteMarknote,
};
