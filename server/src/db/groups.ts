import { ColorId, Group } from "note-types";
import { ObjectId } from "mongodb";

import mongoCollections from "../config/mongoCollections";
import quicknotes from "./quicknotes";
import marknotes from "./marknotes";
import checklists from "./checklists";
const groups = mongoCollections.groups;

/**
 * Creates a new empty group.
 * @param author_id ID of the user who created the note.
 * @param title Title of the group.
 * @param color ID for the color of the group.
 * @returns The new group. Throws an error if failed.
 */
const createGroup = async (
  author_id: string,
  title: string,
  color: ColorId
) => {
  if (!color) throw "createGroup: must provide a color";
  const newGroup: Group = {
    author_id,
    type: "group",
    _id: new ObjectId(),
    title: title,
    color: color,
    quicknotes: [],
    marknotes: [],
    checklists: [],
    lastModified: Date.now(),
    favorited: false,
  };

  const groupsCollection = await groups();

  const insertInfo = await groupsCollection.insertOne(newGroup);
  if (insertInfo.insertedCount === 0)
    throw "createGroup: Could not create new group";
  return newGroup;
};

/**
 * Returns a list of all groups in the database for a specific user.
 * @param author_id ID of the user.
 * @returns List of groups.
 */
const getAllGroups = async (author_id: string) => {
  const groupsCollection = await groups();
  const groupsList = await groupsCollection.find({ author_id }).toArray();

  if (groupsList.length === 0) return [];
  for (const group of groupsList) {
    group._id = group._id.toString();
  }
  return groupsList;
};

/**
 * Returns a single group by its id.
 * @param group_id Target group id.
 * @param author_id ID of the user.
 * @returns The group object if found. Otherwise, throws an error.
 */
const getGroupById = async (group_id: string, author_id: string) => {
  const parsed_id = new ObjectId(group_id.trim());
  const groupsCollection = await groups();
  const group = await groupsCollection.findOne({
    _id: parsed_id,
    author_id,
  });
  return group;
};

/**
 * Updates the group with the target id.
 * @param group_id Target group id.
 * @param author_id ID of the user.
 * @param updatedGroup The updated group information.
 * @returns The updated group if successful. Otherwise, throws an error.
 */
const updateGroupById = async (
  group_id: string,
  author_id: string,
  updatedGroup: Group
) => {
  const groupsCollection = await groups();
  const parsed_id = new ObjectId(group_id.trim());
  const updateInfo = await groupsCollection.updateOne(
    { _id: parsed_id, author_id },
    { $set: updatedGroup }
  );
  if (!updateInfo.matchedCount) throw "updateGroupById: Failed to update group";
  return await getGroupById(group_id.trim(), author_id.trim());
};

/**
 * Deletes the group with the target id. Notes still persist outside of the group.
 * @param group_id Target group id.
 * @param author_id ID of the user.
 * @returns True if successfully deleted. Otherwise, throws an error.
 */
const deleteGroupById = async (group_id: string, author_id: string) => {
  const groupsCollection = await groups();
  const parsed_id = new ObjectId(group_id.trim());

  // Check if group exists
  const group = await getGroupById(group_id.trim(), author_id.trim());
  if (!group) {
    throw `deleteGroupById: Could not find group with id '${group_id}'`;
  }

  // Delete the group
  const deleteInfo = await groupsCollection.deleteOne({
    _id: parsed_id,
    author_id,
  });
  if (deleteInfo.deletedCount === 0)
    throw "deleteGroupById: Failed to delete group";

  // For all notes in the group, remove from their groups array
  for (const quicknote_id of group.quicknotes) {
    await quicknotes.removeGroupFromQuicknote(
      quicknote_id,
      group_id,
      author_id
    );
  }
  for (const marknote_id of group.marknotes) {
    await marknotes.removeGroupFromMarknote(marknote_id, group_id, author_id);
  }

  return true;
};

/**
 * Adds a note to the group.
 * @param group_id Target group id.
 * @param note_id The target note id.
 * @param note_type The target note type.
 * @param author_id ID of the user.
 * @returns The updated group if successful. Otherwise, throws an error.
 */
const addToGroup = async (
  group_id: string,
  note_id: string,
  note_type: string,
  author_id: string
) => {
  const groupsCollection = await groups();
  const parsed_id = new ObjectId(group_id.trim());

  // Update the group
  let updateInfo = null;
  if (note_type === "quicknote") {
    updateInfo = await groupsCollection.updateOne(
      { _id: parsed_id, author_id },
      { $addToSet: { quicknotes: note_id } }
    );
  } else if (note_type === "marknote") {
    updateInfo = await groupsCollection.updateOne(
      { _id: parsed_id, author_id },
      { $addToSet: { marknotes: note_id } }
    );
  } else if (note_type === "checklist") {
    updateInfo = await groupsCollection.updateOne(
      { _id: parsed_id, author_id },
      { $addToSet: { checklists: note_id } }
    );
  }
  if (!updateInfo || !updateInfo.matchedCount)
    throw `addToGroup: Failed to add note {'type': '${note_type}', 'id': '${note_id}'}' to group {'id': '${group_id}'}`;

  // Also update the note
  if (note_type === "quicknote") {
    await quicknotes.addGroupToQuicknote(note_id, group_id, author_id);
  } else if (note_type === "marknote") {
    await marknotes.addGroupToMarknote(note_id, group_id, author_id);
  } else if (note_type === "checklist") {
    await checklists.addGroupToChecklist(note_id, group_id, author_id);
  }
  return await getGroupById(group_id.trim(), author_id.trim());
};

/**
 * Removes the targeted note from the targeted group.
 * @param group_id The target group id.
 * @param note_id The target note id.
 * @param note_type The target note type.
 * @returns The updated group if successful. Otherwise, throws an error.
 */
const removeFromGroup = async (
  group_id: string,
  note_id: string,
  note_type: string,
  author_id: string,
  deleted_note: boolean = false
) => {
  const groupsCollection = await groups();
  const parsed_id = new ObjectId(group_id.trim());

  // Update the group
  let updateInfo = null;
  if (note_type === "quicknote") {
    updateInfo = await groupsCollection.updateOne(
      { _id: parsed_id, author_id },
      { $pull: { quicknotes: note_id } }
    );
  } else if (note_type === "marknote") {
    updateInfo = await groupsCollection.updateOne(
      { _id: parsed_id, author_id },
      { $pull: { marknotes: note_id } }
    );
  } else if (note_type === "checklist") {
    updateInfo = await groupsCollection.updateOne(
      { _id: parsed_id, author_id },
      { $pull: { checklists: note_id } }
    );
  }
  if (!updateInfo || !updateInfo.matchedCount)
    throw `removeFromGroup: Failed to remove note {'type': '${note_type}', 'id': '${note_id}'}' from group {'id': '${group_id}'}`;

  // Also update the note if not deleted
  if (!deleted_note) {
    if (note_type === "quicknote") {
      await quicknotes.removeGroupFromQuicknote(note_id, group_id, author_id);
    } else if (note_type === "marknote") {
      await marknotes.removeGroupFromMarknote(note_id, group_id, author_id);
    } else if (note_type === "checklist") {
      await checklists.removeGroupFromChecklist(note_id, group_id, author_id);
    }
  }

  return await getGroupById(group_id.trim(), author_id.trim());
};

export default {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroupById,
  deleteGroupById,
  addToGroup,
  removeFromGroup,
};
