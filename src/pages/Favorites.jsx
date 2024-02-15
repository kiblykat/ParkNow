import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
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
  const { isLoading, handleFavorites, filteredLots, shownLots } = globalCtx;

  return (
    <>
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
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredLots
                    .slice(shownLots[0], shownLots[1])
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
                          {parkingLot.carpark_info[0].lots_available +
                            "/" +
                            parkingLot.carpark_info[0].total_lots}
                        </Td>
                        <Td textAlign="center">
                          <NavLink
                            to={`/search/${parkingLot.x_coord},${parkingLot.y_coord}`}
                          >
                            <Button colorScheme="orange">Map View</Button>
                          </NavLink>
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
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredLots
                    .slice(shownLots[0], shownLots[1])
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
                          {parkingLot.carpark_info[0].lots_available +
                            "/" +
                            parkingLot.carpark_info[0].total_lots}
                        </Td>
                        <Td textAlign="center">
                          <NavLink
                            to={`/search/${parkingLot.x_coord},${parkingLot.y_coord}`}
                          >
                            <Button colorScheme="orange">🗺️</Button>
                          </NavLink>
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
