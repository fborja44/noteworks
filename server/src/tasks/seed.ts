const dbConnection = require("../config/mongoConnection");
const db = require("../db/");
const chalk = require("chalk");

const main = async () => {
  const dbc = await dbConnection();
  await dbc.dropDatabase(); // Drop the databse before initalizing data to avoid duplicate data.

  console.log(chalk.yellow("Seeding database..."));

  console.log(chalk.yellow("\nDatabase seeding complete."));
  await dbc.serverConfig.close();
};

main().catch(console.log);

export {};
