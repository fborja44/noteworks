declare module "note-types" {
  export type Quicknote = {
    type: "quicknote";
    _id: ObjectId;
    author_id: string;
    title: string;
    color: ColorId;
    body: string;
    lastModified: number;
    favorited: boolean;
    groups: string[];
  };

  export type Marknote = {
    type: "marknote";
    _id: ObjectId;
    author_id: string;
    title: string;
    color: ColorId;
    body: string;
    lastModified: number;
    favorited: boolean;
    groups: string[];
  };

  export type Group = {
    type: "group";
    _id: ObjectId;
    author_id: string;
    title: string;
    color: ColorId;
    quicknotes: string[];
    marknotes: string[];
    checklists: string[];
    lastModified: number;
    favorited: boolean;
  };

  export type Checklist = {
    type: "checklist";
    _id: ObjectId;
    author_id: string;
    title: string;
    color: ColorId;
    items: ChecklistItem[];
    lastModified: number;
    favorited: boolean;
    groups: string[];
  };

  export type ChecklistItem = {
    _id: ObjectId;
    content: string;
    checked: boolean;
  };

  export type ColorId =
    | "grey"
    | "dark_grey"
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "purple"
    | "magenta"
    | "cyan"
    | "lemon"
    | "lime";
}
