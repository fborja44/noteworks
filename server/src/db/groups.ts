import { Group, Marknote, Quicknote } from "note-types";
import { ObjectId } from "mongodb";

const mongoCollections = require("../config/mongoCollections");
const groups = mongoCollections.groups;

/**
 * Creates a new empty group.
 * @param title Title of the group.
 * @param color Hex code for the color of the group.
 * @returns The new group. Throws an error if failed.
 */
const createGroup = async (title: string, color: string) => {
  if (color.trim().length === 0) throw "createGroup: must provide a color";
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
const getAllGroups = async () => {
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
const getGroupById = async (id: string) => {
  const parsed_id = new ObjectId(id.trim());
  const groupsCollection = await groups();
  const group = await groupsCollection.findOne({ _id: parsed_id });

  if (group === null) {
    throw `getGroupById: No group found with id '${id}'`;
  }
  group._id = group._id.toString();

  return group;
};

/**
 * Updates the group with the target id.
 * @param id Target group id.
 * @param updatedGroup The updated group information.
 * @returns The updated group if successful. Otherwise, throws an error.
 */
const updateGroupById = async (id: string, updatedGroup: Group) => {
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
const deleteGroupById = async (id: string) => {
  const groupsCollection = await groups();
  const parsed_id = new ObjectId(id.trim());
  const deleteInfo = await groupsCollection.deleteOne({ _id: parsed_id });
  if (deleteInfo.deletedCount === 0)
    throw "deleteGroupById: Failed to delete group";
  return true;
};

/**
 * Adds a note to the group.
 * @param id Target group id.
 * @param note A quicknote or marknote id.
 * @returns The updated group if successful. Otherwise, throws an error.
 */
const addNoteToGroup = async (id: string, note: Quicknote | Marknote) => {
  const groupsCollection = await groups();
  const parsed_id = new ObjectId(id.trim());

  const updateInfo =
    note.type === "quicknote"
      ? await groupsCollection.updateOne(
          { _id: parsed_id },
          { $addToSet: { quicknotes: note } }
        )
      : await groupsCollection.updateOne(
          { _id: parsed_id },
          { $addToSet: { marknotes: note } }
        );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw "addNoteToGroup: Failed to add note to group";
  return await getGroupById(id.trim());
};

/**
 * Removes the targeted note from the targeted group.
 * @param id The target group id.
 * @param note_id The target note id.
 * @returns The updated group if successful. Otherwise, throws an error.
 */
const removeFromGroup = async (group_id: string, note_id: string) => {

}

/**
 * Deletes all notes in the target group.
 * @param id 
 * @returns The updated group if successful. Otherwise, throws an error.
 */
const deleteAllNotes = async(id: string) => {
  
}

module.exports = {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroupById,
  deleteGroupById,
  addNoteToGroup
};

export {};
