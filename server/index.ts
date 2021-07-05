/* Web Server Setup requirements
------------------------------------------------------------------------------*/
declare function require(name:string);
const express = require("express");
const app = express();
var http = require('http');
const PORT = 3001;

const server = http.createServer(app);
const router = express.Router();

var date = new Date();

/* For background operations - coloring terminal font and pathing for outside
   resources
   ---------------------------------------------------------------------------*/
const path = require('path');
let bodyParser = require("body-parser");
const chalk = require('chalk');

app.use('/', router);
server.listen(PORT);

/* Initial console setup [header] 
------------------------------------------------------------------------------*/
console.log(chalk.bold.cyan('--------- Denote --------- '));
console.log(chalk.bold.cyan(` Created by Francis Borja `));
console.log(chalk.gray(`Server running at port 3001`));
console.log(chalk.gray('---------------------------'));