declare module "note-types" {
  export type Quicknote = {
    author_id: string;
    type: "quicknote";
    _id: ObjectId;
    title: string;
    color: ColorId;
    body: string;
    lastModified: number;
    favorited: boolean;
    groups: string[];
  };

  export type Marknote = {
    author_id: string;
    type: "marknote";
    _id: ObjectId;
    title: string;
    color: ColorId;
    body: string;
    lastModified: number;
    favorited: boolean;
    groups: string[];
  };

  export type Group = {
    author_id: string;
    type: "group";
    _id: ObjectId;
    title: string;
    color: ColorId;
    quicknotes: string[];
    marknotes: string[];
    checklists: string[];
    lastModified: number;
    favorited: boolean;
  };

  export type Checklist = {
    author_id: string;
    type: "checklist";
    _id: ObjectId;
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
