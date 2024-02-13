import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";
import carparkDetails from "../data/HDBCarparkInformation.json";
import {
  Button,
  HStack,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Search() {
  const globalCtx = useContext(GlobalContext);
  const [shownLots, setShownLots] = useState([0, 9]);

  const { search, setSearch, parkList, setParkList, isLoading, setIsLoading } =
    globalCtx;

  useEffect(() => {
    getSlots();
  }, []);

  const getSlots = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://api.data.gov.sg/v1/transport/carpark-availability"
      );
      //- - - SORT  parklist in alphabetical order - - -
      response.data.items[0].carpark_data.sort((a, b) =>
        a.carpark_number.localeCompare(b.carpark_number)
      );

      //- - - MERGE parklist with json - - -
      const mergedData = response.data.items[0].carpark_data.map((carpark) => {
        const details = carparkDetails.find(
          (detail) => detail.car_park_no === carpark.carpark_number
        );
        return { ...carpark, ...details };
      });
      console.log("merged data", mergedData);

      //SET parkList value
      setParkList(mergedData);

      console.log(
        "response.data.items[0].carpark_data: ",
        response.data.items[0].carpark_data
      );
    } catch (error) {
      console.log(`🔴 error encountered: ${error}`);
    } finally {
      setIsLoading(false);
      return null;
    }
  };
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
      <TableContainer>
        <Table variant="striped" colorScheme="orange">
          <Thead>
            <Tr>
              <Th>Carpark Number</Th>
              <Th>Address</Th>
              <Th>Lots Available</Th>
              <Th>Total Lots</Th>
              <Th>View on Map 🗺️</Th>
              <Th>Add to Fav</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredLots
              .slice(shownLots[0], shownLots[1])
              .map((parkingLot) => (
                <Tr>
                  <Td>{parkingLot.carpark_number}</Td>
                  <Td>{parkingLot.address}</Td>
                  <Td>{parkingLot.carpark_info[0].lots_available}</Td>
                  <Td>{parkingLot.carpark_info[0].total_lots}</Td>
                  <Td>
                    <NavLink
                      to={`/search/${parkingLot.x_coord},${parkingLot.y_coord}`}
                    >
                      <Button colorScheme="orange">Map View</Button>
                    </NavLink>
                  </Td>
                  <Td>
                    <Button colorScheme="orange" onClick={() => null}>
                      Favorite ⭐
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
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
