/*
  this file determines arrangement of items in the Navbar component at the top of the page
*/
import { auth } from "../firebase/firebase";
import { doSignOut } from "../firebase/auth";

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
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  //uses context from ContextProviders
  const authCtx = useContext(AuthContext);
  const globalCtx = useContext(GlobalContext);
  //destructure properties from Context objects
  const { userLoggedIn } = authCtx;
  const { parkList, getSlots } = globalCtx;
  //create lastFetched state to update time displayed of lastFetched
  const [lastFetched, setLastFetched] = useState("");

  //when parkList state changed, update the time of lastFetched to the update_datetime of index 0 in fetched data(format - update_datetime:"2024-05-03T10:21:08")
  useEffect(() => {
    let dateTime = parkList[0]?.update_datetime.slice(
      parkList[0].update_datetime.indexOf("T") + 1
    );
    setLastFetched(dateTime);
  }, [parkList]);

  return (
    <div style={{ backgroundColor: "#EE7D00" }}>
      {/* create a responsive wrapping Flex element, small screen: column, med screen:row + space btwn */}
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
          <HStack>
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <Avatar name="ParkNow" src="/img/favicon.ico" m="20px" />
              <Heading>ParkNow</Heading>
            </Box>
            {userLoggedIn && (
              <Button onClick={() => doSignOut(auth)}>Logout</Button>
            )}
          </HStack>
        </Box>
        {/* only show Refresh button if user is logged in */}
        {userLoggedIn && (
          <HStack>
            <Button onClick={() => getSlots()}>Refresh</Button>
            <Text textAlign="center">Data Last Fetched: {lastFetched} </Text>
          </HStack>
        )}

        <HStack m="50px">
          <NavLink to="/search">
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
    </div>
  );
}
