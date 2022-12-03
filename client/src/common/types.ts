/* Type Definitions
------------------------------------------------------------------------------*/
export type Quicknote = {
  _id: string;
  type: string;
  title: string;
  color: string;
  body: string;
  lastModified: number;
  favorited: boolean;
};

export type Marknote = {
  _id: string;
  type: string;
  title: string;
  color: string;
  body: string;
  lastModified: number;
  favorited: boolean;
};

export type Group = {
  _id: string;
  type: string;
  title: string;
  color: string;
  quicknotes: string[];
  marknotes: string[];
  lastModified: number;
  favorited: boolean;
}