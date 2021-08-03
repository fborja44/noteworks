export interface AppTheme {
  mainBackground: string;
  mainTextPrimary: string;
  mainTextSecondary: string;

  note: {
    noteBackground: string;
    noteTextPrimary: string;
    noteTextSecondary: string;
  };
}

export const lightTheme: AppTheme = {
  mainBackground: "#0E0E0",
  mainTextPrimary: "#4f4f4f",
  mainTextSecondary: "#000",

  note: {
    noteBackground: "#FFF",
    noteTextPrimary: "#333333",
    noteTextSecondary: "#828282",
  },
};

export const darkTheme: AppTheme = {
  mainBackground: "#111111",
  mainTextPrimary: "#FFF",
  mainTextSecondary: "#EEE",

  note: {
    noteBackground: "#1F1F23",
    noteTextPrimary: "#FFF",
    noteTextSecondary: "#BDBDBD",
  },
};
