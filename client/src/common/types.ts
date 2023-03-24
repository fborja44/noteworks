import { ColorId } from "./color";

/* Type Definitions
------------------------------------------------------------------------------*/
export type Quicknote = {
  _id: string;
  type: string;
  title: string;
  color: ColorId;
  body: string;
  lastModified: number;
  favorited: boolean;
  groups: string[];
};

export type Marknote = {
  _id: string;
  type: string;
  title: string;
  color: ColorId;
  body: string;
  lastModified: number;
  favorited: boolean;
  groups: string[];
};

export type Group = {
  _id: string;
  type: string;
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
