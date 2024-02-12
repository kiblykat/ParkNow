import React, { createContext, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [search, setSearch] = useState("");
  const [parkList, setParkList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const context = {
    search,
    setSearch,
    parkList,
    setParkList,
    isLoading,
    setIsLoading,
  };

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
}

export default GlobalContext;
