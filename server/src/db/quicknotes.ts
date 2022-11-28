import { Quicknote } from "note-types";
import { ObjectId } from "mongodb";
import { isHex } from "../common/regex"

const mongoCollections = require("../config/mongoCollections");
const quicknotes = mongoCollections.quicknotes;

/**
 * Inserts a quicknote into the database.
 * @param title Title of the note.
 * @param color Hex code for the color of the note.
 * @param body Content of the note.
 * @returns The new quicknote. Throws an error if failed.
 */
const createQuicknote = async (title: string, color: string, body: string) => {
  if (color.trim().length === 0) throw "createQuicknote: must provide a color";
  if (title.length > 30) throw "createQuicknote: Title length cannot exceed 30 characters"
  if (body.length > 300) throw "createQuicknote: Body length cannot exceed 30 characters"
  if (!isHex(color)) throw `createQuicknote: '${color}}' is not a valid hex code`
  const newQuicknote: Quicknote = {
    type: "quicknote",
    _id: new ObjectId(),
    title: title,
    color: color,
    body: body,
    lastModified: Date.now(),
    favorited: false,
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
const getAllQuicknotes = async () => {
  const quicknotesCollection = await quicknotes();
  const quicknotesList = await quicknotesCollection.find({}).toArray();

  if (quicknotesList.length === 0) return [];
  for (const note of quicknotesList) {
    note._id = note._id.toString();
  }
  return quicknotesList;
};

/**
 * Returns a single quicknote by its id.
 * @param id Target quicknote id.
 * @returns The quicknote object if found. Otherwise, throws an error.
 */
const getQuicknoteById = async (id: string) => {
  const parsed_id = new ObjectId(id.trim());
  const quicknotesCollection = await quicknotes();
  const quicknote = await quicknotesCollection.findOne({ _id: parsed_id });

  if (quicknote === null)
    throw `getQuicknoteById: No quicknote found with id '${id}'`;
  quicknote._id = quicknote._id.toString();

  return quicknote;
};

/**
 * Updates the quicknote with the target id.
 * @param id Target quicknote id.
 * @param updatedQuicknote The updated quicknote information.
 * @returns The updated quicknote if successful. Otherwise, throws an error.
 */
const updateQuicknoteById = async (id: string, updatedQuicknote: Quicknote) => {
  if (updatedQuicknote.title.length > 30) throw "updateQuicknoteById: Title length cannot exceed 30 characters."
  if (updatedQuicknote.body.length > 300) throw "updateQuicknoteById: Body length cannot exceed 30 characters."
  if (!isHex(updatedQuicknote.color)) throw `updateQuicknoteById: '${updatedQuicknote.color}}' is not a valid hex code`
  const quicknotesCollection = await quicknotes();
  const parsed_id = new ObjectId(id.trim());
  const updateInfo = await quicknotesCollection.updateOne(
    { _id: parsed_id },
    { $set: updatedQuicknote }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw `updateQuicknoteById: Failed to update quicknote with id '${id}';`
  return await getQuicknoteById(id.trim());
};

/**
 * Deletes the quicknote with the target id.
 * @param id Target quicknote id.
 * @returns True if successfully deleted. Otherwise, throws an error.
 */
const deleteQuicknoteById = async (id: string) => {
  const quicknotesCollection = await quicknotes();
  const parsed_id = new ObjectId(id.trim());
  const deleteInfo = await quicknotesCollection.deleteOne({ _id: parsed_id });
  if (deleteInfo.deletedCount === 0)
    throw `deleteQuicknoteById: Failed to delete quicknote with id '${id}'`;
  return true;
};

module.exports = {
  createQuicknote,
  getAllQuicknotes,
  getQuicknoteById,
  updateQuicknoteById,
  deleteQuicknoteById,
};

export {};
