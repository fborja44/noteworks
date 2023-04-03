import axios from "axios";
import { Dispatch, AnyAction } from "redux";
import { COLOR } from "../common/color";
import { Quicknote } from "../common/types";
import {
  createQuicknote,
  deleteQuicknote,
  updateQuicknotes,
} from "../redux/actions";

const BASE_ADDR = "http://localhost:3001";

/**
 * Creates a new empty quicknote.
 */
const handleCreateQuicknote = async (dispatch: Dispatch<AnyAction>) => {
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
    dispatch(createQuicknote(newQuicknote));
  } catch (e) {
    console.log(e);
  }
};

/**
 * Updates a single quicknote.
 * @param noteId The quicknote id
 * @param updatedQuicknote The new information in update with
 */
const handleUpdateQuicknote = async (
  dispatch: Dispatch<AnyAction>,
  updatedQuicknote: Quicknote
) => {
  try {
    await axios({
      baseURL: BASE_ADDR,
      url: `/quicknotes/${updatedQuicknote._id}`,
      method: "PATCH",
      data: updatedQuicknote,
    });
    dispatch(updateQuicknotes([updatedQuicknote]));
  } catch (e) {
    console.log(e);
  }
};

/**
 * Updates a list of quicknotes.
 * @param noteId The quicknote id
 * @param updatedQuicknotes The new information in update with
 */
const handleUpdateQuicknotes = async (
  dispatch: Dispatch<AnyAction>,
  updatedQuicknotes: Quicknote[]
) => {
  try {
    for (const updatedQuicknote of updatedQuicknotes) {
      await axios({
        baseURL: BASE_ADDR,
        url: `/quicknotes/${updatedQuicknote._id}`,
        method: "PATCH",
        data: updatedQuicknote,
      });
    }
    dispatch(updateQuicknotes(updatedQuicknotes));
  } catch (e) {
    console.log(e);
  }
};

/**
 * Adds a group to a quicknote if not a member.
 * Otherwise, removes the quicknote from the group.
 * @param quicknoteId The quicknote id
 * @param groupId The group id
 */
const handleUpdateQuicknotesGroups = async (
  dispatch: Dispatch<AnyAction>,
  quicknoteId: string,
  groupId: string
) => {
  try {
    const { data } = await axios({
      baseURL: BASE_ADDR,
      url: `/groups/${groupId}/quicknotes/${quicknoteId}`,
      method: "PATCH",
    });
    console.log(data.updatedNote);
    dispatch(updateQuicknotes([data.updatedNote]));
    return data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Deletes a quicknote.
 * @param noteId The id of the quicknote to be deleted
 */
const handleDeleteQuicknote = async (
  dispatch: Dispatch<AnyAction>,
  quicknoteId: string
) => {
  try {
    await axios({
      baseURL: BASE_ADDR,
      url: `/quicknotes/${quicknoteId}`,
      method: "DELETE",
    });
    dispatch(deleteQuicknote(quicknoteId));
  } catch (e) {
    console.log(e);
  }
};

export {
  handleCreateQuicknote,
  handleUpdateQuicknote,
  handleUpdateQuicknotes,
  handleUpdateQuicknotesGroups,
  handleDeleteQuicknote,
};
