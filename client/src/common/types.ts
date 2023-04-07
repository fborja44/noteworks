import { ColorId } from "./color";

/* Type Definitions
------------------------------------------------------------------------------*/
export type Quicknote = {
  _id: string;
  type: "quicknote";
  title: string;
  color: ColorId;
  body: string;
  lastModified: number;
  favorited: boolean;
  groups: string[];
};

export type Marknote = {
  _id: string;
  type: "marknote";
  title: string;
  color: ColorId;
  body: string;
  lastModified: number;
  favorited: boolean;
  groups: string[];
};

export type Checklist = {
  _id: string;
  type: "checklist";
  title: string;
  color: ColorId;
  items: ChecklistItem[];
  lastModified: number;
  favorited: boolean;
  groups: string[];
};

export type ChecklistItem = {
  _id: string;
  content: string;
  checked: boolean;
};

export type Group = {
  _id: string;
  type: "group";
  title: string;
  color: ColorId;
  quicknotes: string[];
  marknotes: string[];
  lastModified: number;
  favorited: boolean;
};

export interface HeroIconProps {
  className?: string;
  filled?: boolean;
  id?: string;
  css?: any;
}
