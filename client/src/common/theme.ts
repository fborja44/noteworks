export interface AppTheme {
  id: string;
  main: {
    background: string;
    backgroundSecondary: string;
    borderColor: string;
    textPrimary: string;
    textSecondary: string;
  };
  title: {
    background: string;
    backgroundSecondary: string;
    borderColor: string;
    textPrimary: string;
    textSecondary: string;
  };
  header: {
    background: string;
    backgroundSecondary: string;
    borderColor: string;
    textPrimary: string;
    textSecondary: string;
  };
  sidebar: {
    background: string;
    backgroundSecondary: string;
    borderColor: string;
    textPrimary: string;
    textSecondary: string;
  };
  note: {
    background: string;
    textPrimary: string;
    textSecondary: string;
    borderColor: string;
    header: {
      textPrimary: string;
      textSecondary: string;
    };
  };
  menu: {
    title: string;
  };
}

export const lightTheme: AppTheme = {
  id: "light",
  main: {
    background: "#E0E0E0",
    backgroundSecondary: "#FFF",
    borderColor: "E0E0E0",
    textPrimary: "#4f4f4f",
    textSecondary: "#000",
  },
  title: {
    background: "#25242c",
    backgroundSecondary: "#3e3d44",
    borderColor: "#25242c",
    textPrimary: "#FFF",
    textSecondary: "#CCCCCC",
  },
  header: {
    background: "#4b4a53",
    backgroundSecondary: "#383740",
    borderColor: "#4b4a53",
    textPrimary: "#FFF",
    textSecondary: "#A6A6A6",
  },
  sidebar: {
    background: "#34333b",
    backgroundSecondary: "#49484e",
    borderColor: "#34333b",
    textPrimary: "#FFF",
    textSecondary: "#CCCCCC",
  },
  note: {
    background: "#FFF",
    textPrimary: "#333333",
    textSecondary: "#828282",
    borderColor: "##3B3B3B",
    header: {
      textPrimary: "#333333",
      textSecondary: "#FFF",
    },
  },
  menu: {
    title: "#4f4f4f",
  },
};

export const darkTheme: AppTheme = {
  id: "dark",
  main: {
    background: "#212121",
    backgroundSecondary: "#34333b",
    borderColor: "#3B3B3B",
    textPrimary: "#E1E1E1",
    textSecondary: "#A6A6A6",
  },
  title: {
    background: "#212121",
    backgroundSecondary: "#2B2B2B",
    borderColor: "#3B3B3B",
    textPrimary: "#E1E1E1",
    textSecondary: "#A6A6A6",
  },
  header: {
    background: "#212121",
    backgroundSecondary: "#2B2B2B",
    borderColor: "#3B3B3B",
    textPrimary: "#E1E1E1",
    textSecondary: "#A6A6A6",
  },
  sidebar: {
    background: "#262626",
    borderColor: "#303030",
    backgroundSecondary: "#3B3B3B",
    textPrimary: "#A6A6A6",
    textSecondary: "#CCCCCC",
  },
  note: {
    background: "#34333b",
    textPrimary: "#333333",
    textSecondary: "#FFF",
    borderColor: "#3B3B3B",
    header: {
      textPrimary: "#333333",
      textSecondary: "#FFF",
    },
  },
  menu: {
    title: "#FFF",
  },
};
