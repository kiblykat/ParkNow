import React, { useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import AuthContext from "../context/AuthContext";

import { Button, HStack, Input, Text } from "@chakra-ui/react";
import SearchTable from "../components/SearchTable";
import { Navigate } from "react-router-dom";

export default function Search() {
  const globalCtx = useContext(GlobalContext);
  const authCtx = useContext(AuthContext);

  const { userLoggedIn } = authCtx;
  const {
    search,
    setSearch,
    getSlots,
    filteredLots,
    nextPage,
    prevPage,
    shownLots,
    apiGetFav,
  } = globalCtx;

  useEffect(() => {
    getSlots();
    apiGetFav(); //this logs console data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* automatically redirect back to Login page if userLoggedIn is false */}
      {!userLoggedIn && <Navigate to={"/"} />}
      <Input
        placeholder="Search lots"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        focusBorderColor="crimson"
        size="lg"
      />
      <SearchTable />
      <Text textAlign="center">
        page: {shownLots[0] / 10 + 1}/{Math.floor(filteredLots.length / 10) + 1}
      </Text>
      <HStack
        m="30px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Button onClick={() => prevPage()}>Prev Page</Button>
        <Button onClick={() => nextPage()}>Next Page</Button>
      </HStack>
    </>
  );
}
