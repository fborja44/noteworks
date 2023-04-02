import axios from "axios";
import { Dispatch, AnyAction } from "redux";
import { COLOR } from "../common/color";
import { Marknote } from "../common/types";
import { updateMarknotesAction } from "../redux/actions";

const BASE_ADDR = "http://localhost:3001";

/**
 * Marknote function to update the marknotes list in app state
 * @param noteId The marknote id
 * @param updatedMarknote The data to update the marknote with
 */
const updateMarknotesState = (
  marknotes: Marknote[],
  updatedMarknote: Marknote,
  dispatch: Dispatch<AnyAction>
) => {
  const updatedMarknotesArray = marknotes.map((note: any) => {
    if (note._id === updatedMarknote._id) {
      return updatedMarknote;
    }
    return note;
  });
  dispatch(updateMarknotesAction(updatedMarknotesArray));
};

/**
 * Marknote function to add a new empty marknote to the list
 */
const handleAddMarknote = async (
  marknotes: Marknote[],
  history: any,
  dispatch: Dispatch<AnyAction>
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
    dispatch(updateMarknotesAction([...marknotes, newMarknote]));
    // Redirect when new note is added
    history.push("/marknotes");
    history.push(`/marknotes/${newMarknote._id}`);
  } catch (e) {
    console.log(e);
  }
};

/**
 * Marknote function to update a marknote in the database
 * @param noteId The marknote id
 * @param updatedMarknote The data to update the marknote with
 */
const handleUpdateMarknote = async (
  noteId: string,
  updatedMarknote: Marknote
) => {
  try {
    await axios({
      baseURL: BASE_ADDR,
      url: `/marknotes/${noteId}`,
      method: "PATCH",
      data: updatedMarknote,
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 * Marknote function to delete a marknote from the list
 * @param noteId The id of the marknote to be deleted
 */
const handleDeleteMarknote = async (
  marknotes: Marknote[],
  noteId: string,
  dispatch: Dispatch<AnyAction>
) => {
  try {
    await axios({
      baseURL: BASE_ADDR,
      url: `/marknotes/${noteId}`,
      method: "DELETE",
    });
    const newMarknotes = marknotes.filter(
      (note: Marknote) => note._id !== noteId
    ); // don't need to make new array since filter returns new array
    dispatch(updateMarknotesAction(newMarknotes));
  } catch (e) {
    console.log(e);
  }
};

export {
  updateMarknotesState,
  handleAddMarknote,
  handleDeleteMarknote,
  handleUpdateMarknote,
};
