import { Collection } from "mongodb";
import dbConnection from "./mongoConnection";

/* Allows one reference to each collection per app */
const getCollectionFn = (collection: any) => {
  let _col: Collection | undefined = undefined;

  return async () => {
    while (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

/* List collections: */
export default {
  groups: getCollectionFn("groups"),
  quicknotes: getCollectionFn("quicknotes"),
  marknotes: getCollectionFn("marknotes"),
  checklists: getCollectionFn("checklists"),
};
