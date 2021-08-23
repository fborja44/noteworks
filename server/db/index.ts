const mongoCollections = require("../config/mongoCollections");
let { ObjectId } = require('mongodb');
const usersData = require('./users');

module.exports = {
  users: usersData,
};