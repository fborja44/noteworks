import { ColorId, Checklist, ChecklistItem } from "note-types";
import { ColorIds } from "../common/colors";
import { ObjectId } from "mongodb";

const mongoCollections = require("../config/mongoCollections");
const groups = require("./groups");
const checklists = mongoCollections.checklists;

/**
 * Inserts a checklist into the database.
 * @param title Title of the checklist.
 * @param color ID for the color of the checklist.
 * @returns The new checklist. Throws an error if failed.
 */
export const createChecklist = async (title: string, color: ColorId) => {
  if (!color) throw "createChecklist: must provide a color";
  if (title.length > 30)
    throw "createChecklist: Title length cannot exceed 30 characters";
  const newChecklist: Checklist = {
    type: "checklist",
    _id: new ObjectId(),
    title: title,
    color: color,
    items: [],
    lastModified: Date.now(),
    favorited: false,
    groups: [],
  };

  const checklistsCollection = await checklists();

  const insertInfo = await checklistsCollection.insertOne(newChecklist);
  if (insertInfo.insertedCount === 0)
    throw "createChecklist: Failed to create new checklist";

  return newChecklist;
};

/**
 * Returns a list of all checklists in the database.
 * @returns List of checklists.
 */
export const getAllChecklists = async () => {
  const checklistsCollection = await checklists();
  const checklistsList = await checklistsCollection.find().toArray();

  if (checklistsList.length === 0) return [];
  for (const checklist of checklistsList) {
    checklist._id = checklist._id.toString();
  }
  return checklistsList;
};

/**
 * Returns a single checklist by its id.
 * @param id Target checklist id.
 * @returns The checklist object if found. Otherwise, null.
 */
export const getChecklistById = async (id: string) => {
  const parsed_id = new ObjectId(id.trim());
  const checklistsCollection = await checklists();
  const checklist = await checklistsCollection.findOne({ _id: parsed_id });
  return checklist;
};

/**
 * Updates the checklist with the target id.
 * @param id Target checklist id.
 * @param updatedChecklist The updated checklist information.
 * @returns The updated checklist if successful. Otherwise, throws an error.
 */
export const updateChecklistById = async (
  id: string,
  updatedChecklist: Checklist
) => {
  if (updatedChecklist.title.length > 30)
    throw "updateChecklistById: Title length cannot exceed 30 characters.";
  if (!ColorIds.includes(updatedChecklist.color))
    throw `updateChecklistById: '${updatedChecklist.color}' is not a valid hex code`;
  const checklistsCollection = await checklists();
  const parsed_id = new ObjectId(id.trim());
  const updateInfo = await checklistsCollection.updateOne(
    { _id: parsed_id },
    { $set: updatedChecklist }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw `updateChecklistById: Failed to update checklist with id '${id}';`;
  return await getChecklistById(id.trim());
};

/**
 * Deletes the checklist with the target id.
 * @param id Target checklist id.
 * @returns True if successfully deleted. Otherwise, throws an error.
 */
export const deleteChecklistById = async (id: string) => {
  const checklistsCollection = await checklists();
  const parsed_id = new ObjectId(id.trim());

  // Check if checklist exists
  const checklist = await getChecklistById(id);
  if (!checklist) {
    throw `deleteChecklistById: Could not find checklist with id '${id}'`;
  }

  // Delete the checklist
  const deleteInfo = await checklistsCollection.deleteOne({ _id: parsed_id });
  if (deleteInfo.deletedCount === 0)
    throw `deleteChecklistById: Failed to delete checklist with id '${id}'`;

  // Remove from all groups
  for (const group_id of checklist.groups) {
    try {
      await groups.removeFromGroup(
        group_id,
        checklist._id.toString(),
        checklist.type,
        true
      );
    } catch (e) {
      console.log(e);
    }
  }

  return true;
};

/**
 * Adds a group to the checklist's groups array.
 * @param checklist_id The target checklist id.
 * @param group_id The target group id.
 * @returns The updated checklist if successful. Otherwise, throws an error.
 */
export const addGroupToChecklist = async (
  checklist_id: string,
  group_id: string
) => {
  const checklistsCollection = await checklists();
  const parsed_id = new ObjectId(checklist_id.trim());

  const updateInfo = await checklistsCollection.updateOne(
    { _id: parsed_id },
    { $addToSet: { groups: group_id } }
  );
  if (!updateInfo.matchedCount || !updateInfo.modifiedCount)
    throw `addGroupToChecklist: Failed to add group {'id': '${group_id}'}' to checklist {'type': 'checklist', 'id': '${checklist_id}'}`;
  return await getChecklistById(checklist_id.trim());
};

/**
 * Removes a group from the checklist's groups array.
 * @param checklist_id The target checklist id.
 * @param group_id The target group id.
 * @returns The updated checklist if successful. Otherwise, throws an error.
 */
export const removeGroupFromChecklist = async (
  checklist_id: string,
  group_id: string
) => {
  const checklistsCollection = await checklists();
  const parsed_id = new ObjectId(checklist_id.trim());

  const updateInfo = await checklistsCollection.updateOne(
    { _id: parsed_id },
    { $pull: { groups: group_id } }
  );
  if (!updateInfo.matchedCount || !updateInfo.modifiedCount)
    throw `removeGroupFromChecklist: Failed to remove group {'id': '${group_id}'}' from checklist {'type': 'checklist', 'id': '${checklist_id}'}`;
  return await getChecklistById(checklist_id.trim());
};

/**
 * Adds a new item to a checklist.
 * @param checklist_id The target checklist id.
 * @param content The content of the new checklist item.
 * @returns The updated checklist if successful. Otherwise, throws an error.
 */
export const addChecklistItem = async (
  checklist_id: string,
  content: string
) => {
  const checklistsCollection = await checklists();
  const parsed_id = new ObjectId(checklist_id.trim());
  const newItem: ChecklistItem = {
    _id: new ObjectId(),
    content: content,
    checked: false,
  };
  const updateInfo = await checklistsCollection.updateOne(
    { _id: parsed_id },
    { $push: { items: newItem } }
  );
  if (!updateInfo.matchedCount || !updateInfo.modifiedCount)
    throw `addChecklistItem: Failed to add item {'id': '${checklist_id}'}' to checklist {'type': 'checklist', 'id': '${checklist_id}'}`;
  return await getChecklistById(checklist_id.trim());
};

/**
 * Removes an item from a checklist.
 * @param checklist_id The target checklist id.
 * @param item_id The target item id.
 * @returns The updated checklist if successful. Otherwise, throws an error.
 */
export const removeChecklistItem = async (
  checklist_id: string,
  item_id: string
) => {
  const checklistsCollection = await checklists();
  const parsed_checklist_id = new ObjectId(checklist_id.trim());
  const parsed_item_id = new ObjectId(item_id.trim());

  const updateInfo = await checklistsCollection.updateOne(
    { _id: parsed_checklist_id },
    { $pull: { items: { _id: parsed_item_id } } }
  );
  if (!updateInfo.matchedCount || !updateInfo.modifiedCount)
    throw `removeChecklistItem: Failed to remove item {'id': '${item_id}'}' from checklist {'type': 'checklist', 'id': '${checklist_id}'}`;
  return await getChecklistById(checklist_id.trim());
};
