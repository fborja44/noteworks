// Require each of the routes
const groups = require("./groupsRoutes");
const quicknotes = require("./quicknotesRoutes");
const marknotes = require("./marknotesRoutes");
const path = require("path");

// Put all the routes together
const constructorMethod = (app: any) => {
  app.use("/", groups);
  app.use("/", quicknotes);
  app.use("/", marknotes);

  // Catch all method
  app.use("*", (req: any, res: any) => {
    res.status(404).render("general/error", {
      status: 404,
      error: "Route not found.",
      partial: "script",
    });
  });
};

module.exports = constructorMethod;

export {};
