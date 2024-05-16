import React, { useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import mockAPI from "../api/mockapi";

import {
  Button,
  Flex,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { NavLink } from "react-router-dom";

export default function Favorites() {
  const globalCtx = useContext(GlobalContext);
  const size = useWindowSize();
  const {
    favoriteList,
    setFavoriteList,
    isLoading,
    filteredLots,
    shownLots,
    getSlots,
    apiHandleDelete,
  } = globalCtx;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await mockAPI.get("/favorites");
        // console.log("response.data is", response.data);
        setFavoriteList(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {console.log("favorite list in Fav: " + { favoriteList })}
      {size.width > 768 ? (
        <div>
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
                    <Th textAlign="center" maxWidth={{ base: "70px" }}>
                      Lot No.
                    </Th>
                    <Th textAlign="center">Address</Th>
                    <Th textAlign="center">Available Lots</Th>
                    <Th textAlign="center">View on Map 🗺️</Th>
                    <Th textAlign="center">Delete ❌</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {favoriteList
                    // .slice(shownLots[0], shownLots[1])
                    .map((parkingLot) => (
                      <Tr key={parkingLot.carpark_number}>
                        <Td textAlign="center" maxWidth="70px">
                          {parkingLot.carpark_number}
                        </Td>
                        <Td textAlign="center" whiteSpace={"wrap"}>
                          {parkingLot.address}
                        </Td>
                        {/*whitespace allows for text wrap*/}
                        <Td textAlign="center" maxWidth="70px">
                          {parkingLot.lots_available +
                            "/" +
                            parkingLot.total_lots}
                        </Td>
                        <Td textAlign="center">
                          <a
                            href={`https://www.google.com/maps?q=${parkingLot.address
                              .split(" ")
                              .join("+")}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Button colorScheme="orange">Map View</Button>
                          </a>
                        </Td>
                        <Td textAlign="center">
                          <Button
                            colorScheme="orange"
                            onClick={() => apiHandleDelete(parkingLot.id)}
                          >
                            Delete ❌
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </div>
      ) : (
        <div>
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
            /* = = = = = = = = = = RESPONSIVE VIEW FOR PHONES <768PX = = = = = = = = = = */
            <TableContainer>
              <Table variant="striped" colorScheme="orange">
                <Thead>
                  <Tr>
                    <Th textAlign="center" maxWidth="70px">
                      Lot No.
                    </Th>
                    <Th textAlign="center" maxWidth="60px" ml="2px" mr="2px">
                      Address
                    </Th>
                    <Th textAlign="center" maxWidth="60px" p="5px">
                      Avail
                    </Th>
                    <Th textAlign="center">Map</Th>
                    <Th textAlign="center">Del</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {favoriteList
                    // .slice(shownLots[0], shownLots[1])
                    .map((parkingLot) => (
                      <Tr key={parkingLot.carpark_number}>
                        <Td textAlign="center" maxWidth="60px" p="5px">
                          {parkingLot.carpark_number}
                        </Td>
                        <Td
                          textAlign="center"
                          maxWidth="140px"
                          whiteSpace={"wrap"}
                          p="5px"
                        >
                          {parkingLot.address}
                        </Td>
                        {/*whitespace allows for text wrap*/}
                        <Td textAlign="center" p="5px" maxWidth="70px">
                          {parkingLot.lots_available +
                            "/" +
                            parkingLot.total_lots}
                        </Td>
                        <Td textAlign="center">
                          <a
                            href={`https://www.google.com/maps?q=${parkingLot.address
                              .split(" ")
                              .join("+")}`}
                          >
                            <Button colorScheme="orange">🗺️</Button>
                          </a>
                        </Td>
                        <Td
                          textAlign="center"
                          onClick={() => apiHandleDelete(parkingLot.id)}
                        >
                          ❌
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </div>
      )}
    </>
  );
}
