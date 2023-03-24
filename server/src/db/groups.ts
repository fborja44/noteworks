import { ColorId, Group, Marknote, Quicknote } from "note-types";
import { ObjectId } from "mongodb";

const mongoCollections = require("../config/mongoCollections");
const quicknotes = require("./quicknotes");
const marknotes = require("./marknotes");
const groups = mongoCollections.groups;

/**
 * Creates a new empty group.
 * @param title Title of the group.
 * @param color ID for the color of the group.
 * @returns The new group. Throws an error if failed.
 */
export const createGroup = async (title: string, color: ColorId) => {
  if (!color) throw "createGroup: must provide a color";
  const newGroup: Group = {
    type: "group",
    _id: new ObjectId(),
    title: title,
    color: color,
    quicknotes: [],
    marknotes: [],
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
 * Returns a list of all groups in the database.
 * @returns List of groups.
 */
export const getAllGroups = async () => {
  const groupsCollection = await groups();
  const groupsList = await groupsCollection.find({}).toArray();

  if (groupsList.length === 0) return [];
  for (const group of groupsList) {
    group._id = group._id.toString();
  }
  return groupsList;
};

/**
 * Returns a single group by its id.
 * @param id Target group id.
 * @returns The group object if found. Otherwise, throws an error.
 */
export const getGroupById = async (id: string) => {
  const parsed_id = new ObjectId(id.trim());
  const groupsCollection = await groups();
  const group = await groupsCollection.findOne({ _id: parsed_id });
  return group;
};

/**
 * Updates the group with the target id.
 * @param id Target group id.
 * @param updatedGroup The updated group information.
 * @returns The updated group if successful. Otherwise, throws an error.
 */
export const updateGroupById = async (id: string, updatedGroup: Group) => {
  const groupsCollection = await groups();
  const parsed_id = new ObjectId(id.trim());
  const updateInfo = await groupsCollection.updateOne(
    { _id: parsed_id },
    { $set: updatedGroup }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw "updateGroupById: Failed to update group";
  return await getGroupById(id.trim());
};

/**
 * Deletes the group with the target id. Notes still persist outside of the group.
 * @param id
 * @returns True if successfully deleted. Otherwise, throws an error.
 */
export const deleteGroupById = async (id: string) => {
  const groupsCollection = await groups();
  const parsed_id = new ObjectId(id.trim());

  // Check if group exists
  const group = await getGroupById(id);
  if (!group) {
    throw `deleteGroupById: Could not find group with id '${id}'`;
  }

  // Delete the group
  const deleteInfo = await groupsCollection.deleteOne({ _id: parsed_id });
  if (deleteInfo.deletedCount === 0)
    throw "deleteGroupById: Failed to delete group";

  // For all notes in the group, remove from their groups array
  for (const quicknote_id of group.quicknotes) {
    await quicknotes.removeGroupFromQuicknote(quicknote_id, id);
  }
  for (const marknote_id of group.marknotes) {
    await marknotes.removeGroupFromMarknote(marknote_id, id);
  }

  return true;
};

/**
 * Adds a note to the group.
 * @param group_id Target group id.
 * @param note_id The target note id.
 * @param note_type The target note type.
 * @returns The updated group if successful. Otherwise, throws an error.
 */
export const addToGroup = async (
  group_id: string,
  note_id: string,
  note_type: string
) => {
  const groupsCollection = await groups();
  const parsed_id = new ObjectId(group_id.trim());

  // Update the group
  const updateInfo =
    note_type === "quicknote"
      ? await groupsCollection.updateOne(
          { _id: parsed_id },
          { $addToSet: { quicknotes: note_id } }
        )
      : await groupsCollection.updateOne(
          { _id: parsed_id },
          { $addToSet: { marknotes: note_id } }
        );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw `addToGroup: Failed to add note {'type': '${note_type}', 'id': '${note_id}'}' to group {'id': '${group_id}'}`;

  // Also update the note
  if (note_type === "quicknote") {
    await quicknotes.addGroupToQuicknote(note_id, group_id);
  } else {
    await marknotes.addGroupToMarknote(note_id, group_id);
  }
  return await getGroupById(group_id.trim());
};

/**
 * Removes the targeted note from the targeted group.
 * @param group_id The target group id.
 * @param note_id The target note id.
 * @param note_type The target note type.
 * @returns The updated group if successful. Otherwise, throws an error.
 */
export const removeFromGroup = async (
  group_id: string,
  note_id: string,
  note_type: string,
  deleted_note: boolean = false
) => {
  const groupsCollection = await groups();
  const parsed_id = new ObjectId(group_id.trim());

  // Update the group
  const updateInfo =
    note_type === "quicknote"
      ? await groupsCollection.updateOne(
          { _id: parsed_id },
          { $pull: { quicknotes: note_id } }
        )
      : await groupsCollection.updateOne(
          { _id: parsed_id },
          { $pull: { marknotes: note_id } }
        );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw `removeFromGroup: Failed to remove note {'type': '${note_type}', 'id': '${note_id}'}' from group {'id': '${group_id}'}`;

  // Also update the note if not deleted
  if (!deleted_note) {
    if (note_type === "quicknote") {
      await quicknotes.removeGroupFromQuicknote(note_id, group_id);
    } else {
      await marknotes.removeGroupFromMarknote(note_id, group_id);
    }
  }

  return await getGroupById(group_id.trim());
};
