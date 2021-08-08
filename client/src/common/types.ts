/* Type Definitions
------------------------------------------------------------------------------*/
export type Quicknote = {
  type: string;
  id: string;
  title: string;
  color: string;
  body: string;
  lastModified: number;
  favorited: boolean;
};

export type Marknote = {
  type: string;
  id: string;
  title: string;
  color: string;
  body: string;
  lastModified: number;
  favorited: boolean;
};

export type Group = {
  type: string;
  id: string;
  title: string;
  color: string;
  quicknotes: string[];
  marknotes: string[];
  lastModified: number;
  favorited: boolean;
}