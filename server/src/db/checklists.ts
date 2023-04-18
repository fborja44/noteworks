import { ColorId, Checklist, ChecklistItem } from "note-types";
import { ColorIds } from "../common/colors";
import { ObjectId } from "mongodb";

const mongoCollections = require("../config/mongoCollections");
const groups = require("./groups");
const checklists = mongoCollections.checklists;

/**
 * Inserts a checklist into the database.
 * @param author_id ID of the user who created the note.
 * @param title Title of the checklist.
 * @param color ID for the color of the checklist.
 * @returns The new checklist. Throws an error if failed.
 */
export const createChecklist = async (
  author_id: string,
  title: string,
  color: ColorId
) => {
  if (!color) throw "createChecklist: must provide a color";
  if (title.length > 30)
    throw "createChecklist: Title length cannot exceed 30 characters";
  const newChecklist: Checklist = {
    author_id,
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
 * @param author_id ID of the user.
 * @returns List of checklists.
 */
export const getAllChecklists = async (author_id: string) => {
  const checklistsCollection = await checklists();
  const checklistsList = await checklistsCollection
    .find({ author_id })
    .toArray();

  if (checklistsList.length === 0) return [];
  for (const checklist of checklistsList) {
    checklist._id = checklist._id.toString();
  }
  return checklistsList;
};

/**
 * Returns a single checklist by its id.
 * @param checklist_id Target checklist id.
 * @param author_id ID of the user.
 * @returns The checklist object if found. Otherwise, null.
 */
export const getChecklistById = async (
  checklist_id: string,
  author_id: string
) => {
  const parsed_id = new ObjectId(checklist_id.trim());
  const checklistsCollection = await checklists();
  const checklist = await checklistsCollection.findOne({
    _id: parsed_id,
    author_id,
  });
  return checklist;
};

/**
 * Updates the checklist with the target id.
 * @param checklist_id Target checklist id.
 * @param updatedChecklist The updated checklist information.
 * @returns The updated checklist if successful. Otherwise, throws an error.
 */
export const updateChecklistById = async (
  checklist_id: string,
  author_id: string,
  updatedChecklist: Checklist
) => {
  if (updatedChecklist.title.length > 30)
    throw "updateChecklistById: Title length cannot exceed 30 characters.";
  if (!ColorIds.includes(updatedChecklist.color))
    throw `updateChecklistById: '${updatedChecklist.color}' is not a valid hex code`;

  // Check all items to see if valid
  for (const item of updatedChecklist.items) {
    if (!item._id || item.checked === undefined || item.content === undefined)
      throw `updateChecklistById: Checklist item {'item_id': '${item._id}'} is missing required fields.`;
    if (typeof item.checked !== "boolean")
      throw `updateChecklistById: Checklist item {'item_id': '${item._id}'} checked status must be a boolean.`;
  }

  const checklistsCollection = await checklists();
  const parsed_id = new ObjectId(checklist_id.trim());
  const updateInfo = await checklistsCollection.updateOne(
    { _id: parsed_id, author_id },
    { $set: updatedChecklist }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw `updateChecklistById: Failed to update checklist with id '${checklist_id}';`;
  return await getChecklistById(checklist_id.trim(), author_id.trim());
};

/**
 * Deletes the checklist with the target id.
 * @param checklist_id Target checklist id.
 * @param author_id ID of the user.
 * @returns True if successfully deleted. Otherwise, throws an error.
 */
export const deleteChecklistById = async (
  checklist_id: string,
  author_id: string
) => {
  const checklistsCollection = await checklists();
  const parsed_id = new ObjectId(checklist_id.trim());

  // Check if checklist exists
  const checklist = await getChecklistById(
    checklist_id.trim(),
    author_id.trim()
  );
  if (!checklist) {
    throw `deleteChecklistById: Could not find checklist with id '${checklist_id}'`;
  }

  // Delete the checklist
  const deleteInfo = await checklistsCollection.deleteOne({
    _id: parsed_id,
    author_id,
  });
  if (deleteInfo.deletedCount === 0)
    throw `deleteChecklistById: Failed to delete checklist with id '${checklist_id}'`;

  // Remove from all groups
  for (const group_id of checklist.groups) {
    try {
      await groups.removeFromGroup(
        group_id,
        checklist._id.toString(),
        checklist.type,
        author_id,
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
 * @param author_id ID of the user.
 * @returns The updated checklist if successful. Otherwise, throws an error.
 */
export const addGroupToChecklist = async (
  checklist_id: string,
  group_id: string,
  author_id: string
) => {
  const checklistsCollection = await checklists();
  const parsed_id = new ObjectId(checklist_id.trim());

  const updateInfo = await checklistsCollection.updateOne(
    { _id: parsed_id, author_id },
    { $addToSet: { groups: group_id } }
  );
  if (!updateInfo.matchedCount)
    throw `addGroupToChecklist: Failed to add group {'id': '${group_id}'} to checklist {'type': 'checklist', 'id': '${checklist_id}'}`;
  return await getChecklistById(checklist_id.trim(), author_id.trim());
};

/**
 * Removes a group from the checklist's groups array.
 * @param checklist_id The target checklist id.
 * @param group_id The target group id.
 * @param author_id ID of the user.
 * @returns The updated checklist if successful. Otherwise, throws an error.
 */
export const removeGroupFromChecklist = async (
  checklist_id: string,
  group_id: string,
  author_id: string
) => {
  const checklistsCollection = await checklists();
  const parsed_id = new ObjectId(checklist_id.trim());

  const updateInfo = await checklistsCollection.updateOne(
    { _id: parsed_id, author_id },
    { $pull: { groups: group_id } }
  );
  if (!updateInfo.matchedCount)
    throw `removeGroupFromChecklist: Failed to remove group {'id': '${group_id}'} from checklist {'type': 'checklist', 'id': '${checklist_id}'}`;
  return await getChecklistById(checklist_id.trim(), author_id.trim());
};

/**
 * Returns a single checklist by its id.
 * @param checklist_id Target checklist id.
 * @param item_id Target checklist item id.
 * @param author_id ID of the user.
 * @returns The checklist object if found. Otherwise, null.
 */
export const getChecklistItemById = async (
  checklist_id: string,
  item_id: string,
  author_id: string
) => {
  const parsed_id = new ObjectId(checklist_id.trim());
  const checklistsCollection = await checklists();

  const checklist = await checklistsCollection.findOne({
    _id: parsed_id,
    author_id,
  });
  if (!checklist)
    throw `getChecklistItemById: Failed to get checklist with id '${checklist_id}'.`;

  // Find checklist item
  for (const item of checklist.items) {
    if (item._id.toString() === item_id) {
      return item;
    }
  }
  throw `getChecklistItemById: Failed to get checklist item with id '${item_id}' from checklist with id '${checklist_id}'.`;
};

/**
 * Adds a new item to a checklist.
 * @param checklist_id The target checklist id.
 * @param author_id ID of the user.
 * @param content The content of the new checklist item.
 * @returns The updated checklist if successful. Otherwise, throws an error.
 */
export const addChecklistItem = async (
  checklist_id: string,
  author_id: string,
  content: string
) => {
  const checklistsCollection = await checklists();
  const parsed_id = new ObjectId(checklist_id.trim());

  const checklist = await getChecklistById(
    checklist_id.trim(),
    author_id.trim()
  );
  if (!checklist)
    throw `addChecklistItem: Failed to get checklist with id '${checklist_id}'.`;

  const newItem: ChecklistItem = {
    _id: new ObjectId().toString(),
    content: content,
    checked: false,
  };

  const updateInfo = await checklistsCollection.updateOne(
    { _id: parsed_id, author_id },
    { $push: { items: newItem } }
  );
  if (!updateInfo.matchedCount)
    throw `addChecklistItem: Failed to add item {'id': '${checklist_id}'}' to checklist {'type': 'checklist', 'id': '${checklist_id}'}`;
  return await getChecklistById(checklist_id.trim(), author_id.trim());
};

/**
 * Removes an item from a checklist.
 * @param checklist_id The target checklist id.
 * @param item_id The target item id.
 * @param author_id ID of the user.
 * @returns The updated checklist if successful. Otherwise, throws an error.
 */
export const removeChecklistItem = async (
  checklist_id: string,
  item_id: string,
  author_id: string
) => {
  const checklistsCollection = await checklists();
  const parsed_checklist_id = new ObjectId(checklist_id.trim());

  const updateInfo = await checklistsCollection.updateOne(
    { _id: parsed_checklist_id, author_id },
    { $pull: { items: { _id: item_id } } }
  );
  if (!updateInfo.matchedCount)
    throw `removeChecklistItem: Failed to remove item {'id': '${item_id}'}' from checklist {'type': 'checklist', 'id': '${checklist_id}'}`;
  return await getChecklistById(checklist_id.trim(), author_id.trim());
};

/**
 * Updates a checklist item in a checklist.
 * @param checklist_id The target checklist id.
 * @param author_id ID of the user.
 * @param updatedItem The target item id.
 * @returns The updated checklist if usccessful. Otherwise, throws an error.
 */
export const updateChecklistItemById = async (
  checklist_id: string,
  author_id: string,
  updatedItem: ChecklistItem
) => {
  // Check checked status
  if (typeof updatedItem.checked !== "boolean")
    throw "updateChecklistItemById: Checklist item checked status must be a boolean.";

  const checklistsCollection = await checklists();
  const parsed_id = new ObjectId(checklist_id.trim());
  const updateInfo = await checklistsCollection.updateOne(
    { _id: parsed_id, "items._id": updatedItem._id.toString(), author_id },
    { $set: { "items.$": updatedItem } }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw `updateChecklistById: Failed to update item {'id': '${updatedItem._id}'}' in checklist {'type': 'checklist', 'id': '${checklist_id}'}`;
  return await getChecklistById(checklist_id.trim(), author_id.trim());
};
