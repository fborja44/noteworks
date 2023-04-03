/* App Container for module providers
------------------------------------------------------------------------------*/
import React, { useState } from "react";

import { Provider as ReduxProvider } from "react-redux";
import store from "../redux/store";
import App from "./App";

const AppProvider = () => {
  return (
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  );
};

export default AppProvider;
