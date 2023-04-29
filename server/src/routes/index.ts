// Require each of the routes
const groups = require("./groupsRoutes");
const quicknotes = require("./quicknotesRoutes");
const marknotes = require("./marknotesRoutes");
const checklists = require("./checklistsRoutes");
const users = require("./usersRoutes");
const path = require("path");

// Put all the routes together
const constructorMethod = (app: any) => {
  app.use("/", groups);
  app.use("/", quicknotes);
  app.use("/", marknotes);
  app.use("/", checklists);
  app.use("/", users);

  // Catch all method
  app.use("*", (req: any, res: any) => {
    res.status(404).json({
      status: 404,
      error: "Route not found.",
    });
  });
};

module.exports = constructorMethod;

export {};
