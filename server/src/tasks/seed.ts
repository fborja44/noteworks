const dbConnection = require("../config/mongoConnection");
const data = require("../db/");
const quicknotes = data.quicknotes;
const marknotes = data.marknotes;
const groups = data.groups;

const chalk = require("chalk");

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase(); // Drop the databse before initalizing data to avoid duplicate data.

  console.log(chalk.yellow("Seeding database..."));

  /* Quicknotes
  ---------------------------------------------------------------------------*/
  // Create
  
  let qn1 = await quicknotes.createQuicknote("Note 1", "#fff", "Body 1");
  let qn2 = await quicknotes.createQuicknote("Note 2", "#000", "Body 2");

  // Update

  qn1.title = "New Note 1"
  qn1.body = "New Body 1"
  qn1.color = "#000"
  qn1.lastModified =  Date.now()
  qn1 = await quicknotes.updateQuicknoteById(qn1._id.toString(), qn1)

  // Get

  let qnget = await quicknotes.getQuicknoteById(qn1._id.toString());
  console.log(qnget)

  let qnlist = await quicknotes.getAllQuicknotes();
  console.log(qnlist);

  // Delete

  let qndelete = await quicknotes.deleteQuicknoteById(qn1._id.toString());
  console.log(qndelete);

  console.log(await quicknotes.getAllQuicknotes());

  /* Marknotes
  ---------------------------------------------------------------------------*/
  // Create
  
  let mn1 = await marknotes.createMarknote("Note 1", "#fff", "Body 1");
  let mn2 = await marknotes.createMarknote("Note 2", "#000", "Body 2");

  // Update

  mn1.title = "New Note 1"
  mn1.body = "New Body 1"
  mn1.color = "#000"
  mn1.lastModified =  Date.now()
  mn1 = await marknotes.updateMarknoteById(mn1._id.toString(), mn1)

  // Get

  let mnget = await marknotes.getMarknoteById(mn1._id.toString());
  console.log(mnget)

  let mnlist = await marknotes.getAllMarknotes();
  console.log(mnlist);

  // Delete

  let mndelete = await marknotes.deleteMarknoteById(mn1._id.toString());
  console.log(mndelete);

  console.log(await marknotes.getAllMarknotes());

  console.log(chalk.yellow("\nDatabase seeding complete."));

  /* Groups
  ---------------------------------------------------------------------------*/
  // Create
  
  let group1 = await groups.createGroup("Group 1", "#fff");
  let group2 = await groups.createGroup("Group 2", "#000");

  // Update

  group1.title = "New Group 1"
  group1.color = "#000"
  group1.lastModified =  Date.now()
  group1 = await groups.updateGroupById(group1._id.toString(), group1)

  // Get

  let groupget = await groups.getGroupById(group1._id.toString());
  console.log(groupget)

  let grouplist = await groups.getAllGroups();
  console.log(grouplist);

  // Delete

  let groupdelete = await groups.deleteGroupById(group1._id.toString());
  console.log(groupdelete);

  console.log(await groups.getAllGroups());

  console.log(chalk.yellow("\nDatabase seeding complete."));

  await db.serverConfig.close();
};



main().catch((e) => {
  console.error(e);
});

export {};
