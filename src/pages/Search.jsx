import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";

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

export default function Search() {
  const globalCtx = useContext(GlobalContext);
  const [shownLots, setShownLots] = useState([0, 9]);
  const size = useWindowSize();

  const {
    search,
    setSearch,
    parkList,
    isLoading,
    getSlots,
    favoriteList,
    handleFavorites,
  } = globalCtx;

  useEffect(() => {
    getSlots();
  }, []);

  //FILTER FUNCTION
  // search === "" ? parkingLot:
  const filteredLots = parkList.filter((parkingLot) => {
    return (
      parkingLot.address?.includes(search.toUpperCase()) ||
      parkingLot.carpark_number.includes(search.toUpperCase())
    );
  });

  //Set Current Shown Lots
  const nextPage = () => {
    const newShownLots = [...shownLots];
    newShownLots[0] += 10;
    newShownLots[1] += 10;
    console.log(shownLots);
    setShownLots(newShownLots);
  };

  const prevPage = () => {
    const newShownLots = [...shownLots];
    if (shownLots[0] - 10 >= 0) {
      newShownLots[0] -= 10;
      newShownLots[1] -= 10;
    }
    console.log(shownLots);

    setShownLots(newShownLots);
  };
  return (
    <>
      <Input
        placeholder="Search lots"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      {isLoading ? (
        <Flex
          w="100vw"
          m="10px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner color="orange" size="xl" emptyColor="blue" />
        </Flex>
      ) : (
        <TableContainer>
          <Table variant="striped" colorScheme="orange">
            <Thead>
              <Tr>
                <Th>Carpark Number</Th>
                <Th>Address</Th>
                <Th>Lots Available</Th>
                {size.width > 768 ? (
                  <>
                    <Th>Total Lots</Th>
                    <Th>View on Map 🗺️</Th>
                    <Th>Add to Fav</Th>
                  </>
                ) : null}
              </Tr>
            </Thead>
            <Tbody>
              {filteredLots
                .slice(shownLots[0], shownLots[1])
                .map((parkingLot) => (
                  <Tr key={parkingLot.carpark_number}>
                    <Td>{parkingLot.carpark_number}</Td>
                    <Td>{parkingLot.address}</Td>
                    <Td>{parkingLot.carpark_info[0].lots_available}</Td>
                    {size.width > 768 ? (
                      <>
                        <Td>{parkingLot.carpark_info[0].total_lots}</Td>
                        <Td>
                          <NavLink
                            to={`/search/${parkingLot.x_coord},${parkingLot.y_coord}`}
                          >
                            <Button colorScheme="orange">Map View</Button>
                          </NavLink>
                        </Td>
                        <Td>
                          <Button
                            colorScheme="orange"
                            onClick={() => handleFavorites()}
                          >
                            Favorite ⭐
                          </Button>
                        </Td>
                      </>
                    ) : null}
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
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
