declare module "note-types" {
  export type Quicknote = {
    type: string;
    _id: ObjectId;
    title: string;
    color: string;
    body: string;
    lastModified: number;
    favorited: boolean;
  };

  export type Marknote = {
    type: string;
    _id: ObjectId;
    title: string;
    color: string;
    body: string;
    lastModified: number;
    favorited: boolean;
  };

  export type Group = {
    type: string;
    _id: ObjectId;
    title: string;
    color: string;
    quicknotes: string[];
    marknotes: string[];
    lastModified: number;
    favorited: boolean;
  };
}
