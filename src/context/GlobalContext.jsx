import React, { createContext, useState } from "react";
import axios from "axios";
import carparkDetails from "../data/HDBCarparkInformation.json";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [search, setSearch] = useState("");
  const [parkList, setParkList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);

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

  const handleFavorites = (carpark_number) => {
    // Check if the carpark_number already exists in favoriteList.
    const isAlreadyFavorite = favoriteList.some(
      (parkingLot) => parkingLot.carpark_number === carpark_number
    );

    if (!isAlreadyFavorite) {
      // Add to favoriteList only if it's not already a favorite.
      setFavoriteList([
        ...favoriteList,
        parkList.find(
          (parkingLot) => parkingLot.carpark_number === carpark_number
        ),
      ]);
    } else {
      // Optionally handle the case when it's already a favorite, like showing an alert.
      console.log("This carpark number is already in your favorites.");
    }

    console.log(favoriteList);
  };

  const context = {
    search,
    setSearch,
    parkList,
    setParkList,
    isLoading,
    setIsLoading,
    getSlots,
    favoriteList,
    handleFavorites,
  };

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
}

export default GlobalContext;
