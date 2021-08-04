export interface AppTheme {
  main: {
    background: string;
    textPrimary: string;
    textSecondary: string;
  };
  note: {
    background: string;
    textPrimary: string;
    textSecondary: string;
    borderColor: string;
  };
}

export const lightTheme: AppTheme = {
  main: {
    background: "#E0E0E0",
    textPrimary: "#4f4f4f",
    textSecondary: "#000",
  },

  note: {
    background: "#FFF",
    textPrimary: "#333333",
    textSecondary: "#828282",
    borderColor: "#828282",
  },
};

export const darkTheme: AppTheme = {
  main: {
    background: "#1E1E22",
    textPrimary: "#DDD",
    textSecondary: "#EEE",
  },

  note: {
    background: "#3C3B45",
    textPrimary: "#DDD",
    textSecondary: "#BDBDBD",
    borderColor: "#5f5f5f",
  },
};
