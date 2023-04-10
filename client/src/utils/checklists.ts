import axios from "axios";
import { Dispatch, AnyAction } from "redux";
import { COLOR } from "../common/color";
import { Checklist, ChecklistItem } from "../common/types";
import {
  createChecklist,
  deleteChecklist,
  setChecklists,
  updateChecklist,
} from "../redux/actions";

const BASE_ADDR = "http://localhost:3001";

/**
 * Fetches checklists from the database.
 */
const fetchChecklists = async (dispatch: Dispatch<AnyAction>) => {
  const { data: savedChecklists } = await axios({
    baseURL: BASE_ADDR,
    url: "/checklists",
    method: "GET",
  });
  // Check if checklists were received
  if (savedChecklists) {
    dispatch(setChecklists(savedChecklists));
  }
};

/**
 * Creates a new empty checklist.
 * @returns The new Checklist object
 */
const handleCreateChecklist = async (
  dispatch: Dispatch<AnyAction>,
  history: any
) => {
  try {
    const { data: newChecklist } = await axios({
      baseURL: BASE_ADDR,
      url: "/checklists",
      method: "POST",
      data: {
        title: "",
        color: COLOR.dark_grey.id,
        body: "",
      },
    });
    dispatch(createChecklist(newChecklist));
    // Redirect when new checklist is added
    // history.push("/checklists");
    // history.push(`/checklists/${newChecklist._id}`);
    return newChecklist;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Updates a checklist.
 * @param updatedChecklist The data to update the checklist with
 */
const handleUpdateChecklist = async (
  dispatch: Dispatch<AnyAction>,
  updatedChecklist: Checklist
) => {
  try {
    await axios({
      baseURL: BASE_ADDR,
      url: `/checklists/${updatedChecklist._id}`,
      method: "PATCH",
      data: updatedChecklist,
    });
    dispatch(updateChecklist(updatedChecklist));
  } catch (e) {
    console.log(e);
  }
};

/**
 * Deletes a checklist.
 * @param checklistId The id of the checklist to be deleted
 */
const handleDeleteChecklist = async (
  dispatch: Dispatch<AnyAction>,
  checklistId: string
) => {
  try {
    await axios({
      baseURL: BASE_ADDR,
      url: `/checklists/${checklistId}`,
      method: "DELETE",
    });
    dispatch(deleteChecklist(checklistId));
  } catch (e) {
    console.log(e);
  }
};

/**
 * Adds a new empty checklist item to a checklist.
 * @param updatedChecklist The target checklist.
 * @returns The updated checklist.
 */
const handleAddChecklistItem = async (
  dispatch: Dispatch<AnyAction>,
  checklist: Checklist
) => {
  try {
    const { data: updatedChecklist } = await axios({
      baseURL: BASE_ADDR,
      url: `/checklists/${checklist._id}/item`,
      method: "POST",
    });
    dispatch(updateChecklist(updatedChecklist));
    return updatedChecklist;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Removes a checklist item to a checklist.
 * @param checklist The target checklist.
 * @param item_id: The id of the item to delete.
 * @returns The updated checklist.
 */
const handleDeleteChecklistItem = async (
  dispatch: Dispatch<AnyAction>,
  checklist: Checklist,
  item_id: string
) => {
  try {
    const { data: updatedChecklist } = await axios({
      baseURL: BASE_ADDR,
      url: `/checklists/${checklist._id}/item/${item_id}`,
      method: "DELETE",
    });
    dispatch(updateChecklist(updatedChecklist));
    return updatedChecklist;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Updates a checklist item in the specified checklist.
 * @param checklist_id The target checklist.
 * @param updatedChecklistItem The checklist item to update.
 * @returns The updated checklist.
 */
const handleUpdateChecklistItem = async (
  dispatch: Dispatch<AnyAction>,
  checklist_id: string,
  updatedChecklistItem: ChecklistItem
) => {
  try {
    const { data: updatedChecklist } = await axios({
      baseURL: BASE_ADDR,
      url: `/checklists/${checklist_id}/item/${updatedChecklistItem._id}`,
      method: "PATCH",
      data: updatedChecklistItem,
    });
    dispatch(updateChecklist(updatedChecklist));
  } catch (e) {
    console.log(e);
  }
};

export {
  fetchChecklists,
  handleCreateChecklist,
  handleUpdateChecklist,
  handleDeleteChecklist,
  handleAddChecklistItem,
  handleDeleteChecklistItem,
  handleUpdateChecklistItem,
};
