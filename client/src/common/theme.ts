export interface AppTheme {
  id: string;
  main: {
    background: string;
    backgroundSecondary: string;
    textPrimary: string;
    textSecondary: string;
  };
  title: {
    background: string;
    backgroundSecondary: string;
    textPrimary: string;
  };
  header: {
    background: string;
    backgroundSecondary: string;
    textPrimary: string;
  };
  sidebar: {
    background: string;
    backgroundSecondary: string;
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
  }
}

export const lightTheme: AppTheme = {
  id: "light",
  main: {
    background: "#E0E0E0",
    backgroundSecondary: "#FFF",
    textPrimary: "#4f4f4f",
    textSecondary: "#000",
  },
  title: {
    background: "#25242c",
    backgroundSecondary: "#3e3d44",
    textPrimary: "#FFF",
  },
  header: {
    background: "#4b4a53",
    backgroundSecondary: "#636269",
    textPrimary: "#FFF",
  },
  sidebar: {
    background: "#34333b",
    backgroundSecondary: "#49484e",
  },
  note: {
    background: "#FFF",
    textPrimary: "#333333",
    textSecondary: "#828282",
    borderColor: "#828282",
    header: {
      textPrimary: "#333333",
      textSecondary: "#FFF",
    },
  },
  menu: {
    title: "#4f4f4f"
  }
};

export const darkTheme: AppTheme = {
  id: "dark",
  main: {
    background: "#1b1a20",
    backgroundSecondary: "#34333b",
    textPrimary: "#DDD",
    textSecondary: "#EEE",
  },
  title: {
    background: "#25242c",
    backgroundSecondary: "#3e3d44",
    textPrimary: "#FFF",
  },
  header: {
    background: "#3a3940",
    backgroundSecondary: "#636269",
    textPrimary: "#FFF",
  },
  sidebar: {
    background: "#34333b",
    backgroundSecondary: "#49484e",
  },
  note: {
    background: "#34333b",
    textPrimary: "#DDD",
    textSecondary: "#BDBDBD",
    borderColor: "#5f5f5f",
    header: {
      textPrimary: "#333333",
      textSecondary: "#FFF",
    },
  },
  menu: {
    title: "#FFF",
  }
};
