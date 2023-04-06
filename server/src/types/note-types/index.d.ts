declare module "note-types" {
  export type Quicknote = {
    type: string;
    _id: ObjectId;
    title: string;
    color: ColorId;
    body: string;
    lastModified: number;
    favorited: boolean;
    groups: string[];
  };

  export type Marknote = {
    type: string;
    _id: ObjectId;
    title: string;
    color: ColorId;
    body: string;
    lastModified: number;
    favorited: boolean;
    groups: string[];
  };

  export type Group = {
    type: string;
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
    type: string;
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
