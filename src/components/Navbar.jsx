import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";

export default function Navbar() {
  return (
    <>
      <Flex>
        <Box display="flex" alignItems="center">
          <Avatar name="GoParkUrself" src="/img/carIcon.jfif" m="20px" />
          <Heading>GoParkUrself</Heading>
        </Box>
        <Spacer />
        <HStack>
          <Button colorScheme="orange" bg="orange.900">
            Search
          </Button>
          <Button colorScheme="orange" bg="orange.900">
            Favorites
          </Button>
        </HStack>
      </Flex>
    </>
  );
}
