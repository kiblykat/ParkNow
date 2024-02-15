import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks"; //use to add responsiveness based on window size

import {
  Button,
  HStack,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import SearchTable from "../components/SearchTable";

export default function Search() {
  const globalCtx = useContext(GlobalContext);

  const {
    search,
    setSearch,
    parkList,
    isLoading,
    getSlots,
    favoriteList,
    handleFavorites,
    filteredLots,
    nextPage,
    prevPage,
    shownLots,
  } = globalCtx;

  useEffect(() => {
    getSlots();
  }, []);

  return (
    <>
      <Input
        placeholder="Search lots"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        focusBorderColor="crimson"
        size="lg"
      />
      <SearchTable />
      <Text textAlign="center">
        page: {shownLots[0] / 10 + 1}/{Math.ceil(filteredLots.length / 10)}
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
