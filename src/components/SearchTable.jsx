import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import {
  Button,
  Flex,
  HStack,
  Input,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { NavLink } from "react-router-dom";

export default function SearchTable() {
  const globalCtx = useContext(GlobalContext);
  const size = useWindowSize();
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

  return (
    <>
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
                <Th maxWidth={{ base: "70px" }}>Lot No.</Th>
                <Th>Address</Th>
                <Td maxWidth="70px">Avail</Td>
                <Th>Add to Fav</Th>
                {size.width > 768 ? (
                  <>
                    <Th>Total Lots</Th>
                    <Th>View on Map 🗺️</Th>
                  </>
                ) : null}
              </Tr>
            </Thead>
            <Tbody>
              {filteredLots
                .slice(shownLots[0], shownLots[1])
                .map((parkingLot) => (
                  <Tr key={parkingLot.carpark_number}>
                    <Td maxWidth="70px">{parkingLot.carpark_number}</Td>
                    <Td whiteSpace={"wrap"}>{parkingLot.address}</Td>{" "}
                    {/*whitespace allows for text wrap*/}
                    <Td maxWidth="70px">
                      {parkingLot.carpark_info[0].lots_available}
                    </Td>
                    <Td>
                      <Button
                        colorScheme="orange"
                        onClick={() => handleFavorites()}
                      >
                        ⭐
                      </Button>
                    </Td>
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
                      </>
                    ) : null}
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
