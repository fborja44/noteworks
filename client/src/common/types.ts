import { ColorId } from "./color";

/* Type Definitions
------------------------------------------------------------------------------*/
export type Quicknote = {
  type: "quicknote";
  _id: string;
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
  _id: string;
  author_id: string;
  title: string;
  color: ColorId;
  body: string;
  lastModified: number;
  favorited: boolean;
  groups: string[];
};

export type Checklist = {
  type: "checklist";
  _id: string;
  author_id: string;
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
  type: "group";
  _id: string;
  author_id: string;
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
  strokeWidth?: number;
}
