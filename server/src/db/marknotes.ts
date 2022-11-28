import { Marknote } from "note-types"
import { isHex } from "../common/regex"
import { ObjectId } from "mongodb";

const mongoCollections = require("../config/mongoCollections");
const marknotes = mongoCollections.marknotes;

/**
 * Inserts a marknote into the database.
 * @param title Title of the note.
 * @param color Hex code for the color of the note.
 * @param body Content of the note.
 * @returns The new marknote. Throws an error if failed.
 */
const createMarknote = async (title: string, color: string, body: string) => {
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
const getAllMarknotes = async () => {
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
 * @returns The marknote object if found. Otherwise, throws an error.
 */
const getMarknoteById = async (id: string) => {
  const parsed_id = new ObjectId(id.trim());
  const marknotesCollection = await marknotes();
  const marknote = await marknotesCollection.findOne({ _id: parsed_id });

  if (marknote === null) throw `getMarknoteById: No marknote found with id '${id}'`;
  marknote._id = marknote._id.toString();

  return marknote;
};

/**
 * Updates the marknote with the target id.
 * @param id Target marknote id
 * @param updatedMarknote The updated marknote information.
 * @returns The updated marknote if successful. Otherwise, throws an error.
 */
const updateMarknoteById = async (id: string, updatedMarknote: Marknote) => {
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
const deleteMarknoteById = async (id: string) => {
  const marknotesCollection = await marknotes();
  const parsed_id = new ObjectId(id.trim());
  const deleteInfo = await marknotesCollection.deleteOne({ _id: parsed_id });
  if (deleteInfo.deletedCount === 0)
    throw "deleteMarknoteById: Failed to delete marknote";
  return true;
};

module.exports = {
  createMarknote,
  getAllMarknotes,
  getMarknoteById,
  updateMarknoteById,
  deleteMarknoteById,
};

export {};
