import axios from "axios";
import { Dispatch, AnyAction } from "redux";
import { COLOR } from "../common/color";
import { Quicknote } from "../common/types";
import { setQuicknotes } from "../redux/actions";

const BASE_ADDR = "http://localhost:3001";

/**
 * Quicknote function to update the quicknotes list in app state
 * when notes are updated.
 * @param updatedQuicknotes Array of updated quicknote data.
 */
const updateQuicknotesState = (
  quicknotes: Quicknote[],
  updatedQuicknotes: Quicknote[],
  dispatch: Dispatch<AnyAction>
) => {
  // Combine lists of updated notes and non-updated notes
  const filteredQuicknotes: Quicknote[] = quicknotes.filter((note) => {
    for (const updatedNote of updatedQuicknotes) {
      if (note._id === updatedNote._id) {
        return false;
      }
    }
    return true;
  });
  dispatch(setQuicknotes([...updatedQuicknotes, ...filteredQuicknotes]));
};

/**
 * Function to add new empty quicknote after add quicknote button is pressed.
 * Color is the id of the note color.
 */
const handleAddQuicknote = async (
  quicknotes: Quicknote[],
  dispatch: Dispatch<AnyAction>
) => {
  try {
    const { data: newQuicknote } = await axios({
      baseURL: BASE_ADDR,
      url: "/quicknotes",
      method: "POST",
      data: {
        title: "",
        color: COLOR.yellow.id,
        body: "",
      },
    });
    dispatch(setQuicknotes([...quicknotes, newQuicknote]));
  } catch (e) {
    console.log(e);
  }
};

/**
 * Function to update a quicknote in the database with updated information
 * @param noteId The quicknote id
 * @param updatedQuicknote The new information in update with
 */
const handleUpdateQuicknote = async (
  noteId: string,
  updatedQuicknote: Quicknote
) => {
  try {
    await axios({
      baseURL: BASE_ADDR,
      url: `/quicknotes/${noteId}`,
      method: "PATCH",
      data: updatedQuicknote,
    });
  } catch (e) {
    console.log(e);
  }
};

/**
 * Function to delete a quicknote from the list
 * @param noteId The id of the quicknote to be deleted
 */
const handleDeleteQuicknote = async (
  items: Quicknote[],
  noteId: string,
  dispatch: Dispatch<AnyAction>
) => {
  try {
    await axios({
      baseURL: BASE_ADDR,
      url: `/quicknotes/${noteId}`,
      method: "DELETE",
    });
    const newQuicknotes = items.filter(
      (note: Quicknote) => note._id !== noteId
    ); // don't need to make new array since filter returns new array
    dispatch(setQuicknotes(newQuicknotes));
  } catch (e) {
    console.log(e);
  }
};

export {
  updateQuicknotesState,
  handleAddQuicknote,
  handleUpdateQuicknote,
  handleDeleteQuicknote,
};
