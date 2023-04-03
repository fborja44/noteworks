import axios from "axios";
import { Dispatch, AnyAction } from "redux";
import { COLOR } from "../common/color";
import { Marknote } from "../common/types";
import {
  createMarknote,
  deleteMarknote,
  updateMarknote,
} from "../redux/actions";

const BASE_ADDR = "http://localhost:3001";

/**
 * Marknote function to add a new empty marknote to the list
 */
const handleCreateMarknote = async (
  dispatch: Dispatch<AnyAction>,
  history: any
) => {
  // Add new to state list
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
 * Updates a marknote in the database
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
 * Deletes a marknote from the database
 * @param noteId The id of the marknote to be deleted
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

export { handleCreateMarknote, handleUpdateMarknote, handleDeleteMarknote };
