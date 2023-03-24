import { ColorId, Quicknote } from "note-types";
import { ObjectId } from "mongodb";
import { ColorIds } from "../common/colors";

const mongoCollections = require("../config/mongoCollections");
const groups = require("./groups");
const quicknotes = mongoCollections.quicknotes;

/**
 * Inserts a quicknote into the database.
 * @param title Title of the note.
 * @param color ID for the color of the note.
 * @param body Content of the note.
 * @returns The new quicknote. Throws an error if failed.
 */
export const createQuicknote = async (
  title: string,
  color: ColorId,
  body: string
) => {
  if (!color) throw "createQuicknote: must provide a color";
  if (title.length > 30)
    throw "createQuicknote: Title length cannot exceed 30 characters";
  if (body.length > 300)
    throw "createQuicknote: Body length cannot exceed 300 characters";
  const newQuicknote: Quicknote = {
    type: "quicknote",
    _id: new ObjectId(),
    title: title,
    color: color,
    body: body,
    lastModified: Date.now(),
    favorited: false,
    groups: [],
  };

  const quicknotesCollection = await quicknotes();

  const insertInfo = await quicknotesCollection.insertOne(newQuicknote);
  if (insertInfo.insertedCount === 0)
    throw "createQuicknote: Failed to create new quicknote";

  return newQuicknote;
};

/**
 * Returns a list of all quicknotes in the database.
 * @returns List of quicknotes.
 */
export const getAllQuicknotes = async () => {
  const quicknotesCollection = await quicknotes();
  const quicknotesList = await quicknotesCollection.find().toArray();

  if (quicknotesList.length === 0) return [];
  for (const note of quicknotesList) {
    note._id = note._id.toString();
  }
  return quicknotesList;
};

/**
 * Returns a single quicknote by its id.
 * @param id Target quicknote id.
 * @returns The quicknote object if found. Otherwise, null.
 */
export const getQuicknoteById = async (id: string) => {
  const parsed_id = new ObjectId(id.trim());
  const quicknotesCollection = await quicknotes();
  const quicknote = await quicknotesCollection.findOne({ _id: parsed_id });
  return quicknote;
};

/**
 * Updates the quicknote with the target id.
 * @param id Target quicknote id.
 * @param updatedQuicknote The updated quicknote information.
 * @returns The updated quicknote if successful. Otherwise, throws an error.
 */
export const updateQuicknoteById = async (
  id: string,
  updatedQuicknote: Quicknote
) => {
  if (updatedQuicknote.title.length > 30)
    throw "updateQuicknoteById: Title length cannot exceed 30 characters.";
  if (updatedQuicknote.body.length > 300)
    throw "updateQuicknoteById: Body length cannot exceed 300 characters.";
  if (!ColorIds.includes(updatedQuicknote.color))
    throw `updateQuicknoteById: '${updatedQuicknote.color}' is not a valid hex code`;
  const quicknotesCollection = await quicknotes();
  const parsed_id = new ObjectId(id.trim());
  const updateInfo = await quicknotesCollection.updateOne(
    { _id: parsed_id },
    { $set: updatedQuicknote }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw `updateQuicknoteById: Failed to update quicknote with id '${id}';`;
  return await getQuicknoteById(id.trim());
};

/**
 * Deletes the quicknote with the target id.
 * @param id Target quicknote id.
 * @returns True if successfully deleted. Otherwise, throws an error.
 */
export const deleteQuicknoteById = async (id: string) => {
  const quicknotesCollection = await quicknotes();
  const parsed_id = new ObjectId(id.trim());

  // Check if note exists
  const note = await getQuicknoteById(id);
  if (!note) {
    throw `deleteQuicknoteById: Could not find quicknote with id '${id}'`;
  }

  // Delete the note
  const deleteInfo = await quicknotesCollection.deleteOne({ _id: parsed_id });
  if (deleteInfo.deletedCount === 0)
    throw `deleteQuicknoteById: Failed to delete quicknote with id '${id}'`;

  // Remove from all groups
  for (const group_id of note.groups) {
    try {
      await groups.removeFromGroup(
        group_id,
        note._id.toString(),
        note.type,
        true
      );
    } catch (e) {
      console.log(e);
    }
  }

  return true;
};

/**
 * Adds a group to the quicknote's groups array.
 * @param note_id The target note id.
 * @param group_id The target group id.
 * @returns The updated quicknote if successful. Otherwise, throws an error.
 */
export const addGroupToQuicknote = async (
  note_id: string,
  group_id: string
) => {
  const quicknotesCollection = await quicknotes();
  const parsed_id = new ObjectId(note_id.trim());

  const updateInfo = await quicknotesCollection.updateOne(
    { _id: parsed_id },
    { $addToSet: { groups: group_id } }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw `addGroupToQuicknote: Failed to add group {'id': '${group_id}'}' to note {'type': 'quicknote', 'id': '${note_id}'}`;
  return await getQuicknoteById(note_id.trim());
};

/**
 * Removes a group from the quicknote's groups array.
 * @param note_id The target note id.
 * @param group_id The target group id.
 * @returns The updated quicknote if successful. Otherwise, throws an error.
 */
export const removeGroupFromQuicknote = async (
  note_id: string,
  group_id: string
) => {
  const quicknotesCollection = await quicknotes();
  const parsed_id = new ObjectId(note_id.trim());

  const updateInfo = await quicknotesCollection.updateOne(
    { _id: parsed_id },
    { $pull: { groups: group_id } }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw `removeGroupFromQuicknote: Failed to remove group {'id': '${group_id}'}' from note {'type': 'quicknote', 'id': '${note_id}'}`;
  return await getQuicknoteById(note_id.trim());
};
