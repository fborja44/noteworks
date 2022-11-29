import { Marknote } from "note-types"
import { isHex } from "../common/regex"
import { ObjectId } from "mongodb";

const mongoCollections = require("../config/mongoCollections");
const marknotes = mongoCollections.marknotes;
const groups = require("./groups");

/**
 * Inserts a marknote into the database.
 * @param title Title of the note.
 * @param color Hex code for the color of the note.
 * @param body Content of the note.
 * @returns The new marknote. Throws an error if failed.
 */
export const createMarknote = async (title: string, color: string, body: string) => {
  if (color.trim().length === 0) throw "createMarknote: must provide a color";
  if (!isHex(color)) throw `createMarknote: '${color}}' is not a valid hex code`
  const newMarknote: Marknote = {
    type: "marknote",
    _id: new ObjectId(),
    title: title,
    color: color,
    body: body,
    lastModified: Date.now(),
    favorited: false,
    groups: []
  };

  const marknotesCollection = await marknotes();

  const insertInfo = await marknotesCollection.insertOne(newMarknote);
  if (insertInfo.insertedCount === 0)
    throw "createMarknote: Could not create new quicknote";

  return newMarknote;
};

/**
 * Returns a list of all quicknotes in the database.
 * @returns List of marknotes.
 */
export const getAllMarknotes = async () => {
  const marknotesCollection = await marknotes();
  const marknotesList = await marknotesCollection.find({}).toArray();

  if (marknotesList.length === 0) return [];
  for (const note of marknotesList) {
    note._id = note._id.toString();
  }
  return marknotesList;
};

/**
 * Returns a single quicknote by its id.
 * @param id Target marknote id.
 * @returns The marknote object if found. Otherwise, null.
 */
export const getMarknoteById = async (id: string) => {
  const parsed_id = new ObjectId(id.trim());
  const marknotesCollection = await marknotes();
  const marknote = await marknotesCollection.findOne({ _id: parsed_id });
  return marknote;
};

/**
 * Updates the marknote with the target id.
 * @param id Target marknote id
 * @param updatedMarknote The updated marknote information.
 * @returns The updated marknote if successful. Otherwise, throws an error.
 */
export const updateMarknoteById = async (id: string, updatedMarknote: Marknote) => {
  if (!isHex(updatedMarknote.color)) throw `updateMarknote: '${updatedMarknote.color}}' is not a valid hex code`
  const marknotesCollection = await marknotes();
  const parsed_id = new ObjectId(id.trim());
  const updateInfo = await marknotesCollection.updateOne(
    { _id: parsed_id },
    { $set: updatedMarknote }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw "updateMarknoteById: Failed to update marknote";
  return await getMarknoteById(id.trim());
};

/**
 * Deletes the quicknote with the target id.
 * @param id Target marknote id.
 * @returns True if successfully deleted. Otherwise, throws an error.
 */
export const deleteMarknoteById = async (id: string) => {
  const marknotesCollection = await marknotes();
  const parsed_id = new ObjectId(id.trim());

  // Check if note exists
  const note = await getMarknoteById(id);
  if (!note) {
    throw `deleteMarknoteById: Could not find marknote with id '${id}'`;
  }
  
  // Delete the note
  const deleteInfo = await marknotesCollection.deleteOne({ _id: parsed_id });
  if (deleteInfo.deletedCount === 0)
    throw "deleteMarknoteById: Failed to delete marknote";

    // Remove from all groups
    for (const group_id of note.groups) {
      try {
        await groups.removeFromGroup(group_id, note._id.toString(), note.type, true)
      } catch (e) {
        console.log(e)
      }
    }

  return true;
};

/**
 * Adds a group to the marknote's groups array.
 * @param note_id The target note id.
 * @param group_id The target group id.
 * @returns The updated marknote if successful. Otherwise, throws an error.
 */
export const addGroupToMarknote = async (note_id: string, group_id: string) => {
  const marknotesCollection = await marknotes();
  const parsed_id = new ObjectId(note_id.trim());

  const updateInfo = await marknotesCollection.updateOne(
    { _id: parsed_id },
    { $addToSet: { groups: group_id } }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw `addGroupToMarknote: Failed to add group {'id': '${group_id}'}' to note {'type': 'marknote', 'id': '${note_id}'}`;
  return await getMarknoteById(note_id.trim());
};

/**
 * Removes a group from the marknote's group array.
 * @param note_id The target note id.
 * @param group_id The target group id.
 * @returns The updated marknote if successful. Otherwise, throws an error.
 */
export const removeGroupFromMarknote = async (note_id: string, group_id: string) => {
  const marknotesCollection = await marknotes();
  const parsed_id = new ObjectId(note_id.trim());

  const updateInfo = await marknotesCollection.updateOne(
    { _id: parsed_id },
    { $pull: { groups: group_id } }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw `removeGroupFromMarknote: Failed to remove group {'id': '${group_id}'}' from note {'type': 'marknote', 'id': '${note_id}'}`;
  return await getMarknoteById(note_id.trim());
}