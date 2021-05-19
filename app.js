const express = require('express');
const session = require('express-session');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const chalk = require('chalk'); // add colors to output for easier reading

const mongoCollections = require('./config/mongoCollections');
const dbConnection = require('./config/mongoConnection');
const games = mongoCollections.games;

const data = require('./data/');
const usersData = data.users;
const gamesData = data.games;
const reviewsData = data.reviews;

const handlebarsInstance = exphbs.create({
  defaultLayout: 'main',
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number')
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    }
  }
});

// If the user posts to the server with a property called _method, rewrite the request's method
// To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
// rewritten in this middleware to a PUT route
const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }
  next();
};

app.use;
app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

/**
 * Logging Middleware to help with debugging routes
 * Logs the following information:
 * - Current Timestamp
 * - Request Method
 * - Request Route
 * - Whether the user is authenticated (temporaryily disabled)
 */
 app.use(async (req, res, next) => {
  let curr_time = new Date().toUTCString();
  let method = req.method;
  let route = req.originalUrl;
  let auth;
  auth = chalk.red("(Non-Authenticated User)"); // Temporary
//   if (req.session.user_id) {
//       auth = chalk.green("(Authenticated User)");
//   } else {
//       auth = chalk.red("(Non-Authenticated User)");
//   }
  console.log(chalk.gray(`[${curr_time}]: `) + `${method} ` + chalk.yellow(`${route} `) + auth);

  next();
});

configRoutes(app);

app.listen(3000, () => {
    console.log(chalk.cyan("============================================================================="));
    console.log(chalk.gray("                                   DeNote!                                   "));
    console.log(chalk.gray("                      A project created by Francis Borja                     "));
    console.log(chalk.green("                 Server is running on http://localhost:3000                 "));
    console.log(chalk.cyan("============================================================================="));
});
