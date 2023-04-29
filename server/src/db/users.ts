import { ColorId, Checklist, ChecklistItem } from "note-types";
import { ColorIds } from "../common/colors";
import { ObjectId } from "mongodb";

import mongoCollections from "../config/mongoCollections";
const quicknotes = mongoCollections.quicknotes;
const marknotes = mongoCollections.marknotes;
const checklists = mongoCollections.checklists;
const groups = mongoCollections.groups;

/**
 * Deletes all notes for a specific user.
 * @param user_id ID of the user.
 * @returns Deletion status of each note type.
 */
const deleteAllNotes = async (user_id: string) => {
  const status = {
    groups: true,
    quicknotes: true,
    marknotes: true,
    checklists: true,
  };
  const groupsCollection = await groups();
  const quicknotesCollection = await quicknotes();
  const marknotesCollection = await marknotes();
  const checklistsCollection = await checklists();

  // Delete all groups
  const groupsDeleteInfo = await groupsCollection.deleteMany({
    author_id: user_id,
  });
  if (groupsDeleteInfo.deletedCount === 0) status.groups = false;
  // Delete all quicknotes
  const quicknotesDeleteInfo = await quicknotesCollection.deleteMany({
    author_id: user_id,
  });
  if (quicknotesDeleteInfo.deletedCount === 0) status.quicknotes = false;
  // Delete all marknotes
  const marknotesDeleteInfo = await marknotesCollection.deleteMany({
    author_id: user_id,
  });
  if (marknotesDeleteInfo.deletedCount === 0) status.marknotes = false;
  // Delete all checklists
  const checklistsDeleteInfo = await checklistsCollection.deleteMany({
    author_id: user_id,
  });
  if (checklistsDeleteInfo.deletedCount === 0) status.checklists = false;
  console.log(`Deleting notes for user with ID [${user_id}]: `, status);
  return status;
};

export default {
  deleteAllNotes,
};
