const dbConnection = require("./mongoConnection");

/* Allows one reference to each collection per app */
const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

/* List collections: */
module.exports = {
  groups: getCollectionFn("groups"),
  quicknotes: getCollectionFn("quicknotes"),
  marknotes: getCollectionFn("marknotes"),
};
