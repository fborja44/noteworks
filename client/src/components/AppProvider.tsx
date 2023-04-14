/* App Container for module providers
------------------------------------------------------------------------------*/
import React from "react";

import { Provider as ReduxProvider } from "react-redux";
import { AuthProvider } from "../firebase/AuthProvider";
import { SnackbarProvider } from "notistack";
import store from "../redux/store";
import App from "./App";

const AppProvider = () => {
  return (
    <AuthProvider>
      <ReduxProvider store={store}>
        <SnackbarProvider
          maxSnack={3}
          style={{ width: "100%" }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          dense={true}
        >
          <App />
        </SnackbarProvider>
      </ReduxProvider>
    </AuthProvider>
  );
};

export default AppProvider;
