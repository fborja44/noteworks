import axios from "axios";
import { Dispatch, AnyAction } from "redux";
import { COLOR } from "../common/color";
import { Quicknote } from "../common/types";
import { User } from "firebase/auth";
import { createQuicknote, deleteQuicknote, setQuicknotes, updateQuicknotes } from "../redux/actions/quicknotesActions";

const BASE_ADDR = "http://localhost:3001";

/**
 * Fetches quicknotes from the database.
 */
const fetchQuicknotes = async (dispatch: Dispatch<AnyAction>, user: User) => {
  const { data: savedQuicknotes } = await axios({
    baseURL: BASE_ADDR,
    url: `/user/${user.uid}/quicknotes`,
    method: "GET",
  });
  // Check if notes were received
  if (savedQuicknotes) {
    dispatch(setQuicknotes(savedQuicknotes));
  }
};

/**
 * Creates a new empty quicknote.
 * @returns The new Quicknote object.
 */
const handleCreateQuicknote = async (
  dispatch: Dispatch<AnyAction>,
  user: User
) => {
  try {
    const { data: newQuicknote } = await axios({
      baseURL: BASE_ADDR,
      url: `/user/${user.uid}/quicknotes`,
      method: "POST",
      data: {
        title: "",
        color: COLOR.yellow.id,
        body: "",
      },
    });
    dispatch(createQuicknote(newQuicknote));
    return newQuicknote;
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
  updatedQuicknote: Quicknote,
  user: User
) => {
  try {
    await axios({
      baseURL: BASE_ADDR,
      url: `/user/${user.uid}/quicknotes/${updatedQuicknote._id}`,
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
  updatedQuicknotes: Quicknote[],
  user: User
) => {
  try {
    for (const updatedQuicknote of updatedQuicknotes) {
      await axios({
        baseURL: BASE_ADDR,
        url: `/user/${user.uid}/quicknotes/${updatedQuicknote._id}`,
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
 * @deprecated Use handleUpdateNote groups in groups module instead.
 * Adds a group to a quicknote if not a member.
 * Otherwise, removes the quicknote from the group.
 * @param quicknoteId The quicknote id
 * @param groupId The group id
 */
const handleUpdateQuicknotesGroups = async (
  dispatch: Dispatch<AnyAction>,
  quicknoteId: string,
  groupId: string,
  user: User
) => {
  try {
    const { data } = await axios({
      baseURL: BASE_ADDR,
      url: `/user/${user.uid}/groups/${groupId}/quicknotes/${quicknoteId}`,
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
 * @param quicknoteId The id of the quicknote to be deleted
 */
const handleDeleteQuicknote = async (
  dispatch: Dispatch<AnyAction>,
  quicknoteId: string,
  user: User
) => {
  try {
    await axios({
      baseURL: BASE_ADDR,
      url: `/user/${user.uid}/quicknotes/${quicknoteId}`,
      method: "DELETE",
    });
    dispatch(deleteQuicknote(quicknoteId));
  } catch (e) {
    console.log(e);
  }
};

export {
  fetchQuicknotes,
  handleCreateQuicknote,
  handleUpdateQuicknote,
  handleUpdateQuicknotes,
  handleUpdateQuicknotesGroups,
  handleDeleteQuicknote,
};
