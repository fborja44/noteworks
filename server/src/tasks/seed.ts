const dbConnection = require("../config/mongoConnection");
const data = require("../db/");
const quicknotes = data.quicknotes;

const chalk = require("chalk");

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase(); // Drop the databse before initalizing data to avoid duplicate data.

  console.log(chalk.yellow("Seeding database..."));

  /* Creating quicknotes
  ---------------------------------------------------------------------------*/
  let qn1 = await quicknotes.createQuicknote("Title", "#fff", "Body");

  console.log(chalk.yellow("\nDatabase seeding complete."));

  await db.serverConfig.close();
};

main().catch((e) => {
  console.error(e);
});

export {};
