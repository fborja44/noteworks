import { ColorId, Marknote } from "note-types";
import { ObjectId } from "mongodb";
import { ColorIds } from "../common/colors";

import mongoCollections from "../config/mongoCollections";
import groups from "./groups";
const marknotes = mongoCollections.marknotes;

/**
 * Inserts a marknote into the database.
 * @param author_id ID of the user.
 * @param title Title of the note.
 * @param color ID for the color of the note.
 * @param body Content of the note.
 * @returns The new marknote. Throws an error if failed.
 */
const createMarknote = async (
  author_id: string,
  title: string,
  color: ColorId,
  body: string
) => {
  if (!color) throw "createMarknote: must provide a color";
  const newMarknote: Marknote = {
    author_id,
    type: "marknote",
    _id: new ObjectId(),
    title: title,
    color: color,
    body: body,
    lastModified: Date.now(),
    favorited: false,
    groups: [],
  };

  const marknotesCollection = await marknotes();

  const insertInfo = await marknotesCollection.insertOne(newMarknote);
  if (insertInfo.insertedCount === 0)
    throw "createMarknote: Could not create new marknote";

  return newMarknote;
};

/**
 * Returns a list of all marknotes in the database for a specific user.
 * @param author_id ID of the user.
 * @returns List of marknotes.
 */
const getAllMarknotes = async (author_id: string) => {
  const marknotesCollection = await marknotes();
  const marknotesList = await marknotesCollection.find({ author_id }).toArray();

  if (marknotesList.length === 0) return [];
  for (const note of marknotesList) {
    note._id = note._id.toString();
  }
  return marknotesList;
};

/**
 * Returns a single marknote by its id.
 * @param note_id Target marknote id.
 * @param author_id ID of the user.
 * @returns The marknote object if found. Otherwise, null.
 */
const getMarknoteById = async (note_id: string, author_id: string) => {
  const parsed_id = new ObjectId(note_id.trim());
  const marknotesCollection = await marknotes();
  const marknote = await marknotesCollection.findOne({
    _id: parsed_id,
    author_id,
  });
  return marknote;
};

/**
 * Updates the marknote with the target id.
 * @param note_id Target marknote id
 * @param author_id ID of the user.
 * @param updatedMarknote The updated marknote information.
 * @returns The updated marknote if successful. Otherwise, throws an error.
 */
const updateMarknoteById = async (
  note_id: string,
  author_id: string,
  updatedMarknote: Marknote
) => {
  if (!ColorIds.includes(updatedMarknote.color))
    throw `updateMarknote: '${updatedMarknote.color}' is not a valid color code`;
  const marknotesCollection = await marknotes();
  const parsed_id = new ObjectId(note_id.trim());
  const updateInfo = await marknotesCollection.updateOne(
    { _id: parsed_id, author_id },
    { $set: updatedMarknote }
  );
  if (!updateInfo.matchedCount)
    throw "updateMarknoteById: Failed to update marknote";
  return await getMarknoteById(note_id.trim(), author_id.trim());
};

/**
 * Deletes the marknote with the target id.
 * @param note_id Target marknote id.
 * @param author_id ID of the user.
 * @returns True if successfully deleted. Otherwise, throws an error.
 */
const deleteMarknoteById = async (
  note_id: string,
  author_id: string
) => {
  const marknotesCollection = await marknotes();
  const parsed_id = new ObjectId(note_id.trim());

  // Check if note exists
  const note = await getMarknoteById(note_id.trim(), author_id.trim());
  if (!note) {
    throw `deleteMarknoteById: Could not find marknote with id '${note_id}'`;
  }

  // Delete the note
  const deleteInfo = await marknotesCollection.deleteOne({
    _id: parsed_id,
    author_id,
  });
  if (deleteInfo.deletedCount === 0)
    throw "deleteMarknoteById: Failed to delete marknote";

  // Remove from all groups
  for (const group_id of note.groups) {
    try {
      await groups.removeFromGroup(
        group_id,
        note._id.toString(),
        note.type,
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
 * Adds a group to the marknote's groups array.
 * @param note_id The target note id.
 * @param group_id The target group id.
 * @param author_id ID of the user.
 * @returns The updated marknote if successful. Otherwise, throws an error.
 */
const addGroupToMarknote = async (
  note_id: string,
  group_id: string,
  author_id: string
) => {
  const marknotesCollection = await marknotes();
  const parsed_id = new ObjectId(note_id.trim());

  const updateInfo = await marknotesCollection.updateOne(
    { _id: parsed_id, author_id },
    { $addToSet: { groups: group_id } }
  );
  if (!updateInfo.matchedCount)
    throw `addGroupToMarknote: Failed to add group {'id': '${group_id}'}' to note {'type': 'marknote', 'id': '${note_id}'}`;
  return await getMarknoteById(note_id.trim(), author_id.trim());
};

/**
 * Removes a group from the marknote's group array.
 * @param note_id The target note id.
 * @param group_id The target group id.
 * @param author_id ID of the user.
 * @returns The updated marknote if successful. Otherwise, throws an error.
 */
const removeGroupFromMarknote = async (
  note_id: string,
  group_id: string,
  author_id: string
) => {
  const marknotesCollection = await marknotes();
  const parsed_id = new ObjectId(note_id.trim());

  const updateInfo = await marknotesCollection.updateOne(
    { _id: parsed_id, author_id },
    { $pull: { groups: group_id } }
  );
  if (!updateInfo.matchedCount)
    throw `removeGroupFromMarknote: Failed to remove group {'id': '${group_id}'}' from note {'type': 'marknote', 'id': '${note_id}'}`;
  return await getMarknoteById(note_id.trim(), author_id.trim());
};

export default {
  createMarknote,
  getAllMarknotes,
  getMarknoteById,
  updateMarknoteById,
  deleteMarknoteById,
  addGroupToMarknote,
  removeGroupFromMarknote
}