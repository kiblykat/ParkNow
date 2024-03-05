import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import carparkDetails from "../data/HDBCarparkInformation.json";
import mockAPI from "../api/mockapi";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [search, setSearch] = useState("");
  const [parkList, setParkList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const [shownLots, setShownLots] = useState([0, 9]);

  const apiHandleDelete = async (carpark_number) => {
    try {
      const response = await mockAPI.delete(`/favorites/${carpark_number}`);
      apiGetFav();
    } catch {}
  };
  const apiGetFav = async () => {
    try {
      const response = await mockAPI.get("/favorites");
      setFavoriteList(response.data);
      console.log("response.data is: ", response.data);
      console.log("favoriteList is: ", favoriteList);
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log("favorite list: ", favoriteList);
    }
  };

  const handleFavorites = async (
    carpark_number,
    address,
    lots_available,
    total_lots
  ) => {
    // Check if the carpark_number already exists in favoriteList.

    const isAlreadyFavorite = favoriteList.some(
      (parkingLot) => parkingLot.carpark_number === carpark_number
    );

    if (!isAlreadyFavorite) {
      let newFavorite = {
        carpark_number: carpark_number,
        address: address,
        lots_available: lots_available,
        total_lots: total_lots,
      };
      try {
        const response = await mockAPI.post("/favorites", newFavorite);
        console.log("response data from mockapi is:", response.data);
        await apiGetFav();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

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

      //SET parkList value
      setParkList(mergedData);
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
    if (Math.floor(shownLots[0] / 10) < Math.floor(filteredLots.length / 10)) {
      console.log("shownLots " + shownLots[0]);
      console.log("filteredLots.length " + filteredLots.length);
      const newShownLots = [...shownLots];
      newShownLots[0] += 10;
      newShownLots[1] += 10;
      console.log(shownLots);
      setShownLots(newShownLots);
    }
  };

  const prevPage = () => {
    const newShownLots = [...shownLots];
    if (shownLots[0] - 10 >= 0) {
      newShownLots[0] -= 10;
      newShownLots[1] -= 10;
    }
    console.log(newShownLots);

    setShownLots(newShownLots);
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
    setFavoriteList,
    handleFavorites,
    filteredLots,
    nextPage,
    prevPage,
    shownLots,
    apiGetFav,
    apiHandleDelete,
  };

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
}

export default GlobalContext;
