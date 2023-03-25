/* Color Code definitions
------------------------------------------------------------------------------*/

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

/**
 * id: Unique identifier for the note color which is saved in the database.
 */
export type NoteColor = {
  id: ColorId;
  primary: string;
  secondary: string;
  body: string;
  footer: string;
};

const grey: NoteColor = {
  id: "grey",
  primary: "#B4B4B4",
  secondary: "#B4B4B4",
  body: "#DDDDDD",
  footer: "#CACACA",
};

const dark_grey: NoteColor = {
  id: "dark_grey",
  primary: "#828282",
  secondary: "#6C6C6C",
  body: "#C3C3C3",
  footer: "#B0B0B0",
};

const red: NoteColor = {
  id: "red",
  primary: "#EB5757",
  secondary: "#C92828",
  body: "#F2A9A9",
  footer: "#FA9393",
};

const orange: NoteColor = {
  id: "orange",
  primary: "#F2994A",
  secondary: "#DA5C15",
  body: "#FFD4AD",
  footer: "#FAC291",
};

const yellow: NoteColor = {
  id: "yellow",
  primary: "#F5D354",
  secondary: "#C68729",
  body: "#FFEBA1",
  footer: "#FCE489",
};

const green: NoteColor = {
  id: "green",
  primary: "#27AE60",
  secondary: "#1B842B",
  body: "#9AECBD",
  footer: "#75EDA8",
};

const blue: NoteColor = {
  id: "blue",
  primary: "#2F80ED",
  secondary: "#1E63AE",
  body: "#ABD2FB",
  footer: "#83B9F3",
};

const purple: NoteColor = {
  id: "purple",
  primary: "#BB6BD9",
  secondary: "#AF2DC5",
  body: "#E5AEFA",
  footer: "#DC89FB",
};

const magenta: NoteColor = {
  id: "magenta",
  primary: "#F035A5",
  secondary: "#B9146D",
  body: "#FA8DCE",
  footer: "#FA6CC1",
};

const cyan: NoteColor = {
  id: "cyan",
  primary: "#31C6DA",
  secondary: "#3D87BD",
  body: "#8EEEFB",
  footer: "#62E2F4",
};

const lemon: NoteColor = {
  id: "lemon",
  primary: "#FAFF00",
  secondary: "#DEAE06",
  body: "#FEFFD8",
  footer: "#F7F9B2",
};

const lime: NoteColor = {
  id: "lime",
  primary: "#58D744",
  secondary: "#6A9425",
  body: "#BCFFB1",
  footer: "#9DFB8F",
};

export const COLOR = {
  grey: grey,
  dark_grey: dark_grey,
  red: red,
  orange: orange,
  yellow: yellow,
  green: green,
  blue: blue,
  purple: purple,
  magenta: magenta,
  cyan: cyan,
  lemon: lemon,
  lime: lime,
};
