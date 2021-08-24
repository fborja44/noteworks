import { Quicknote } from "note-types";
import { ObjectId } from "mongodb";

const mongoCollections = require("../config/mongoCollections");
const quicknotes = mongoCollections.quicknotes;

const createQuicknote = async (title: string, color: string, body: string) => {
  if (color.trim().length === 0) throw "createQuicknote: must provide a color";

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
    throw "createQuicknote: Could not create new quicknote";
  const id = insertInfo.insertedId.toString();

  return newQuicknote;
};

const getAllQuicknotes = async () => {
  const quicknotesCollection = await quicknotes();
  const quicknotesList = await quicknotesCollection.find({}).toArray();

  if (quicknotesList.length === 0) return [];
  for (const note of quicknotesList) {
    note._id = note._id.toString();
  }
  return quicknotesList;
};

const getQuicknoteById = async (id: string) => {
  const parsed_id = new ObjectId(id.trim());
  const quicknotesCollection = await quicknotes();
  const quicknote = await quicknotesCollection.findOne({ _id: parsed_id });

  if (quicknote === null)
    throw `getQuicknoteById: No quicknote found with id '${id}'`;
  quicknote._id = quicknote._id.toString();

  return quicknote;
};

// TODO: check length of title and body
const updateQuicknoteById = async (id: string, updatedQuicknote: Quicknote) => {
  const quicknotesCollection = await quicknotes();
  const parsed_id = new ObjectId(id.trim());
  const updateInfo = await quicknotesCollection.updateOne(
    { _id: parsed_id },
    { $set: updatedQuicknote }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw "updateQuicknoteById: Failed to update quicknote";
  return await getQuicknoteById(id.trim());
};

const deleteQuicknoteById = async (id: string) => {
  const quicknotesCollection = await quicknotes();
  const parsed_id = new ObjectId(id.trim());
  const deleteInfo = await quicknotesCollection.deleteOne({ _id: parsed_id });
  if (deleteInfo.deletedCount === 0)
    throw "deleteQuicknoteById: Failed to delete quicknote";
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
