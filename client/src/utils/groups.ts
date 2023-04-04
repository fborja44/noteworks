import axios from "axios";
import { Dispatch, AnyAction } from "redux";
import { COLOR } from "../common/color";
import { Group, Marknote, Quicknote } from "../common/types";
import {
  createGroup,
  deleteGroup,
  setGroups,
  updateGroup,
  updateMarknote,
  updateQuicknotes,
} from "../redux/actions";

const BASE_ADDR = "http://localhost:3001";

/**
 * Fetches groups from the database.
 */
const fetchGroups = async (dispatch: Dispatch<AnyAction>) => {
  const { data: savedGroups } = await axios({
    baseURL: BASE_ADDR,
    url: "/groups",
    method: "GET",
  });
  // Check if notes were received
  if (savedGroups) {
    dispatch(setGroups(savedGroups));
  }
};

/**
 * Creates a new empty group.
 */
const handleCreateGroup = async (dispatch: Dispatch<AnyAction>) => {
  try {
    const { data: newGroup } = await axios({
      baseURL: BASE_ADDR,
      url: "/groups",
      method: "POST",
      data: {
        title: "",
        color: COLOR.dark_grey.id,
      },
    });
    dispatch(createGroup(newGroup));
  } catch (e) {
    console.log(e);
  }
};

/**
 * Updates a group.
 * @param updatedGroup The data to update the group with
 */
const handleUpdateGroup = async (
  dispatch: Dispatch<AnyAction>,
  updatedGroup: Group
) => {
  try {
    await axios({
      baseURL: BASE_ADDR,
      url: `/groups/${updatedGroup._id}`,
      method: "PATCH",
      data: updatedGroup,
    });
    dispatch(updateGroup(updatedGroup));
  } catch (e) {
    console.log(e);
  }
};

/**
 * Adds a group to a note if not a member.
 * Otherwise, removes the note from the group.
 * Updates both the note document and the group document.
 * @param note The note to update
 * @param groupid The group id
 */
const handleUpdateNoteGroups = async (
  dispatch: Dispatch<AnyAction>,
  note: Quicknote | Marknote,
  groupId: string
) => {
  try {
    const { data } = await axios({
      baseURL: BASE_ADDR,
      url: `/groups/${groupId}/${note.type}s/${note._id}`,
      method: "PATCH",
    });
    if (note.type === "quicknote") {
      dispatch(updateQuicknotes([data.updatedNote]));
    } else if (note.type === "marknote") {
      dispatch(updateMarknote(data.updatedNote));
    }
    return data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Deletes a group.
 * @param groupId The id of the group to be deleted
 */
const handleDeleteGroup = async (
  dispatch: Dispatch<AnyAction>,
  groupId: string
) => {
  try {
    await axios({
      baseURL: BASE_ADDR,
      url: `/groups/${groupId}`,
      method: "DELETE",
    });
    dispatch(deleteGroup(groupId));
  } catch (e) {
    console.log(e);
  }
};

export {
  fetchGroups,
  handleCreateGroup,
  handleUpdateGroup,
  handleUpdateNoteGroups,
  handleDeleteGroup,
};
