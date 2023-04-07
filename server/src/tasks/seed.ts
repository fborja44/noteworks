import { Checklist, Group, Marknote, Quicknote } from "note-types";

const dbConnection = require("../config/mongoConnection");
const data = require("../db/");
const quicknotes = data.quicknotes;
const marknotes = data.marknotes;
const groups = data.groups;
const checklists = data.checklists;

const chalk = require("chalk");

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase(); // Drop the databse before initalizing data to avoid duplicate data.

  console.log(chalk.yellow("Seeding database..."));

  /* Quicknotes
  ---------------------------------------------------------------------------*/
  // Create

  let qn1: Quicknote = await quicknotes.createQuicknote(
    "Note 1",
    "red",
    "Body 1"
  );
  let qn2: Quicknote = await quicknotes.createQuicknote(
    "Note 2",
    "yellow",
    "Body 2"
  );

  // Update

  qn1.title = "New Note 1";
  qn1.body = "New Body 1";
  qn1.color = "yellow";
  qn1.lastModified = Date.now();
  qn1 = await quicknotes.updateQuicknoteById(qn1._id.toString(), qn1);

  // Get

  let qnget = await quicknotes.getQuicknoteById(qn1._id.toString());
  console.log(qnget);

  let qnlist = await quicknotes.getAllQuicknotes();
  console.log(qnlist);

  // Delete

  let qndelete = await quicknotes.deleteQuicknoteById(qn1._id.toString());
  console.log(qndelete);

  console.log(await quicknotes.getAllQuicknotes());

  /* Marknotes
  ---------------------------------------------------------------------------*/
  // Create

  let mn1: Marknote = await marknotes.createMarknote("Note 1", "red", "Body 1");
  let mn2: Marknote = await marknotes.createMarknote(
    "Note 2",
    "yellow",
    "Body 2"
  );

  // Update

  mn1.title = "New Note 1";
  mn1.body = "New Body 1";
  mn1.color = "yellow";
  mn1.lastModified = Date.now();
  mn1 = await marknotes.updateMarknoteById(mn1._id.toString(), mn1);

  // Get

  let mnget = await marknotes.getMarknoteById(mn1._id.toString());
  console.log(mnget);

  let mnlist = await marknotes.getAllMarknotes();
  console.log(mnlist);

  // Delete

  let mndelete = await marknotes.deleteMarknoteById(mn1._id.toString());
  console.log(mndelete);

  console.log(await marknotes.getAllMarknotes());

  /* Checklists
  ---------------------------------------------------------------------------*/
  // Create

  let checklist1: Checklist = await checklists.createChecklist(
    "Checklist 1",
    "red"
  );
  let checklist2: Checklist = await checklists.createChecklist(
    "Checklist 2",
    "yellow"
  );

  // Update

  checklist1.title = "New Checklist 1";
  checklist1.color = "yellow";
  checklist1.lastModified = Date.now();
  checklist1 = await checklists.updateChecklistById(
    checklist1._id.toString(),
    checklist1
  );

  // Get

  let checklistget = await checklists.getChecklistById(
    checklist1._id.toString()
  );
  console.log(checklistget);

  let checklistlist = await checklists.getAllChecklists();
  console.log(checklistlist);

  // Delete

  let checklistdelete = await checklists.deleteChecklistById(
    checklist1._id.toString()
  );
  console.log(checklistdelete);

  console.log(await checklists.getAllChecklists());

  // Add Item

  checklist2 = await checklists.addChecklistItem(
    checklist2._id.toString(),
    "Item 1"
  );

  checklist2 = await checklists.addChecklistItem(
    checklist2._id.toString(),
    "Item 2"
  );

  // Remove Item

  // checklist2 = await checklists.removeChecklistItem(
  //   checklist2._id.toString(),
  //   checklist2.items[0]._id.toString()
  // );

  // Get Item

  let checklist_item1 = await checklists.getChecklistItemById(
    checklist2._id.toString(),
    checklist2.items[0]._id.toString()
  );
  console.log(checklist_item1);

  /* Groups
  ---------------------------------------------------------------------------*/
  // // Create

  // let group1: Group = await groups.createGroup("Group 1", "red");
  // let group2: Group = await groups.createGroup("Group 2", "yellow");

  // // Update

  // group1.title = "New Group 1";
  // group1.color = "yellow";
  // group1.lastModified = Date.now();
  // group1 = await groups.updateGroupById(group1._id.toString(), group1);

  // // Get

  // let groupget = await groups.getGroupById(group1._id.toString());
  // console.log(groupget);

  // let grouplist = await groups.getAllGroups();
  // console.log(grouplist);

  // // Delete

  // let groupdelete = await groups.deleteGroupById(group1._id.toString());
  // console.log(groupdelete);

  // console.log(await groups.getAllGroups());

  // // Add Note To Group

  // let groupadd1 = await groups.addToGroup(
  //   group2._id.toString(),
  //   qn2._id.toString(),
  //   qn2.type
  // );
  // let groupadd2 = await groups.addToGroup(
  //   group2._id.toString(),
  //   mn2._id.toString(),
  //   mn2.type
  // );
  // let groupadd3 = await groups.addToGroup(
  //   group2._id.toString(),
  //   checklist2._id.toString(),
  //   checklist2.type
  // );

  // console.log(await groups.getGroupById(group2._id.toString()));
  // console.log(await quicknotes.getAllQuicknotes());
  // console.log(await marknotes.getAllMarknotes());

  // Delete group with notes added to it

  // let groupdelete2 = await groups.deleteGroupById(group2._id.toString());
  // console.log(groupdelete2);

  // console.log(await groups.getGroupById(group2._id.toString()))
  // console.log(await quicknotes.getAllQuicknotes());
  // console.log(await marknotes.getAllMarknotes());

  // Delete note that's in a group

  // let notedelete1 = await quicknotes.deleteQuicknoteById(qn2._id.toString());
  // let notedelete2 = await marknotes.deleteMarknoteById(mn2._id.toString());

  // console.log(await groups.getGroupById(group2._id.toString()))

  // Remove Note from Group

  // let groupremove1 = await groups.removeFromGroup(group2._id.toString(), qn2._id.toString(), qn2.type)
  // let groupremove2 = await groups.removeFromGroup(group2._id.toString(), mn2._id.toString(), mn2.type)

  // console.log(await groups.getGroupById(group2._id.toString()))
  // console.log(await quicknotes.getAllQuicknotes());

  /* END OF SEED
  ---------------------------------------------------------------------------*/
  await db.serverConfig.close();

  console.log(chalk.yellow("\nDatabase seeding complete."));
};

main().catch((e) => {
  console.error(e);
});

export {};
