// Require each of the routes
const groups = require("./groupsRoutes");
const quicknotes = require("./quicknotesRoutes");
const marknotes = require("./marknotesRoutes");
const path = require("path");

// Put all the routes together
const constructorMethod = (app: any) => {
  app.use("/groups", groups);
  app.use("/quicknotes", quicknotes);
  app.use("/marknotes", marknotes);

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
