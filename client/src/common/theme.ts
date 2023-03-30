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
    borderHoverColor: string;
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
    hoverColor: string;
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
  editor: {
    background: string;
  };
}

export const lightTheme: AppTheme = {
  id: "light",
  main: {
    background: "#FFFFFF",
    backgroundSecondary: "#F7F7F7",
    borderColor: "#EDEDED",
    textPrimary: "#6B6B74",
    textSecondary: "#6B6B6B",
  },
  title: {
    background: "#FFFFFF",
    backgroundSecondary: "#E6E6E6",
    borderColor: "#E6E6E6",
    borderHoverColor: "#D9D9D9",
    textPrimary: "#6B6B74",
    textSecondary: "#6B6B6B",
  },
  header: {
    background: "#4b4a53",
    backgroundSecondary: "#F2F2F2",
    borderColor: "#EDEDED",
    textPrimary: "#6B6B74",
    textSecondary: "#6B6B6B",
  },
  sidebar: {
    background: "#F9F9F9",
    backgroundSecondary: "#EDEDED",
    borderColor: "#EDEDED",
    hoverColor: "#F3F3F3",
    textPrimary: "#6B6B6B",
    textSecondary: "#6B6B6B",
  },
  note: {
    background: "#E6E6E6",
    textPrimary: "#333333",
    textSecondary: "#828282",
    borderColor: "##3B3B3B",
    header: {
      textPrimary: "#333333",
      textSecondary: "#FFF",
    },
  },
  menu: {
    title: "#4F4F4F",
  },
  editor: {
    background: "$FFFFFF",
  },
};

export const darkTheme: AppTheme = {
  id: "dark",
  main: {
    background: "#212121",
    backgroundSecondary: "#303030",
    borderColor: "#323232",
    textPrimary: "#E1E1E1",
    textSecondary: "#A6A6A6",
  },
  title: {
    background: "#212121",
    backgroundSecondary: "#2B2B2B",
    borderColor: "#3B3B3B",
    borderHoverColor: "#444444",
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
    backgroundSecondary: "#3B3B3B",
    borderColor: "#303030",
    hoverColor: "#313131",
    textPrimary: "#A6A6A6",
    textSecondary: "#CCCCCC",
  },
  note: {
    background: "#3B3B3B",
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
  editor: {
    background: "#1D1D1D",
  },
};
