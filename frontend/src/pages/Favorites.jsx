import React, { useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import parkingAPI from "../api/mockapi";

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
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Favorites() {
  const authCtx = useContext(AuthContext);
  const globalCtx = useContext(GlobalContext);
  const size = useWindowSize();
  const { favoriteList, setFavoriteList, isLoading, apiHandleDelete } =
    globalCtx;
  const { currentUser, userLoggedIn } = authCtx;

  useEffect(() => {
    const fetchData = async () => {
      try {
        //console.log("debug currentUser is: " + JSON.stringify(currentUser.uid));
        const response = await parkingAPI.get("/favorites", {
          headers: {
            Authorization: `Bearer ${currentUser.uid}`,
          },
        });
        setFavoriteList(response.data.data);
      } catch (error) {
        console.log(error.message);
      } finally {
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!userLoggedIn && <Navigate to="/" />}
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
                            onClick={() => apiHandleDelete(parkingLot._id)}
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
                          onClick={() => apiHandleDelete(parkingLot._id)}
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
