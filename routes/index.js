// Require each of the routes
const usersRoutes = require('./users');
const path = require('path');

// Put all the routes together
const constructorMethod = (app) => {
  app.use('/', usersRoutes);

  // Catch all method
  app.use('*', (req, res) => {
      res.status(404).json({ message: "Route not found." })
  });
};

module.exports = constructorMethod;
