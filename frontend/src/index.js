import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { GlobalProvider } from "./context/GlobalContext";
import { AuthProvider } from "./context/AuthContext";
// import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </GlobalProvider>
    </AuthProvider>
  </React.StrictMode>
);
