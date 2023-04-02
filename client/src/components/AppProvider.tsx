/* App Container for module providers
------------------------------------------------------------------------------*/
import React from "react";

import { ThemeProvider } from "@emotion/react";
import { darkTheme } from "../common/theme";
import { Provider as ReduxProvider } from "react-redux";
import store from "../redux/store";
import App from "./App";

const AppProvider = () => {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </ReduxProvider>
  );
};

export default AppProvider;
