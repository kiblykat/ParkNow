import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { GlobalProvider } from "./context/GlobalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </GlobalProvider>
  </React.StrictMode>
);
