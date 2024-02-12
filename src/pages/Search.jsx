import React, { useContext, useEffect } from "react";
import GlobalContext, { GlobalProvider } from "../context/GlobalContext";
import axios from "axios";
import carparkDetails from "../data/HDBCarparkInformation.json";
import {
  Button,
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
  const filteredLots = parkList.filter((parkingLot) => {
    return (
      search === parkingLot.address?.includes(search.toUpperCase()) ||
      parkingLot.carpark_number.includes(search.toUpperCase())
    );
  });
  return (
    <>
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
            {filteredLots.map((parkingLot) => (
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
    </>
  );
}
