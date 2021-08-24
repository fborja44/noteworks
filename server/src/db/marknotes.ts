import { Marknote } from "note-types";
import { ObjectId } from "mongodb";

const mongoCollections = require("../config/mongoCollections");
const marknotes = mongoCollections.marknotes;

const createMarknote = async (title: string, color: string, body: string) => {
  if (color.trim().length === 0) throw "createMarknote: must provide a color";

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
  const id = insertInfo.insertedId.toString();

  return newMarknote;
};

const getAllMarknotes = async () => {
  const marknotesCollection = await marknotes();
  const marknotesList = await marknotesCollection.find({}).toArray();

  if (marknotesList.length === 0) return [];
  for (const note of marknotesList) {
    note._id = note._id.toString();
  }
  return marknotesList;
};

const getMarknoteById = async (id: string) => {
  const parsed_id = new ObjectId(id.trim());
  const marknotesCollection = await marknotes();
  const marknote = await marknotesCollection.findOne({ _id: parsed_id });

  if (marknote === null) throw `getMarknoteById: No marknote found with id '${id}'`;
  marknote._id = marknote._id.toString();

  return marknote;
};

const updateMarknoteById = async (id: string, updatedMarknote: Marknote) => {
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
