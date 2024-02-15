import { SearchIcon } from "@chakra-ui/icons";
import { StarIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";

export default function Navbar() {
  const globalCtx = useContext(GlobalContext);
  const { parkList, getSlots } = globalCtx;

  const [lastFetched, setLastFetched] = useState("");

  useEffect(() => {
    let dateTime = parkList[0]?.update_datetime.slice(
      parkList[0].update_datetime.indexOf("T") + 1
    );
    setLastFetched(dateTime);
  }, [parkList]);

  return (
    <>
      <Flex
        direction={{
          base: "column",
          md: "row",
        }}
        justifyContent={{
          base: "center",
          md: "space-between",
        }}
        alignItems={{
          base: "center",
          md: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Avatar name="ParkNow" src="/img/carIcon.jfif" m="20px" />
          <Heading>ParkNow</Heading>
        </Box>

        <HStack>
          <Button onClick={() => getSlots()}>Refresh</Button>
          <Text textAlign="center">Data Last Fetched: {lastFetched} </Text>
        </HStack>

        <HStack m="50px">
          <NavLink to="search">
            <Button
              leftIcon={<SearchIcon />}
              colorScheme="orange"
              bg="orange.900"
            >
              Search
            </Button>
          </NavLink>
          <NavLink to="favorites">
            <Button
              leftIcon={<StarIcon />}
              colorScheme="orange"
              bg="orange.900"
            >
              Favorites
            </Button>
          </NavLink>
        </HStack>
      </Flex>
    </>
  );
}
