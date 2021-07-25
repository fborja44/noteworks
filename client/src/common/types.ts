/* Type Definitions
------------------------------------------------------------------------------*/
type Quicknote = {
  type: string;
  id: string;
  title: string;
  color: string;
  body: string;
  lastModified: number;
  favorited: boolean;
};

export type { Quicknote };

type Marknote = {
  type: string;
  id: string;
  title: string;
  color: string;
  body: string;
  lastModified: number;
  favorited: Boolean;
};

export type { Marknote };
