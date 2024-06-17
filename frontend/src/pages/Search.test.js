import React from "react";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // to use toBeInTheDocument
import Search from "./Search.jsx";
import { GlobalProvider } from "../context/GlobalContext.jsx";
import { act } from "react-dom/test-utils";

//auto imports jest modules from __mocks__ folder
jest.mock("axios");

// Create a mock value for the GlobalContext
const mockGlobalContextValue = {
  search: "mocked search value", // Provide a mock value for search
  setSearch: jest.fn(),
  getSlots: jest.fn(),
  filteredLots: [],
};

describe("apiGetFav", () => {
  beforeAll(() => {
    axios.create.mockReturnThis();
  });
  it("contains word 'page' within document", async () => {
    const mockResponse = {
      items: [
        {
          timestamp: "2024-05-16T08:23:27+08:00",
          carpark_data: [
            {
              carpark_info: [
                {
                  total_lots: "105",
                  lot_type: "C",
                  lots_available: "25",
                },
              ],
              carpark_number: "HE12",
              update_datetime: "2024-05-16T08:22:05",
            },
          ],
        },
      ],
    };
    axios.get.mockResolvedValue({
      mockResponse,
    });
    render(
      <GlobalProvider>
        <Search />
      </GlobalProvider>
    );

    const headerElem = screen.getByText(/page:/i);
    expect(headerElem).toBeInTheDocument();
    // const mockedSetFavoriteList = jest.fn(); //mock function
    // expect(mockedSetFavoriteList).toHaveBeenCalledTimes(1);
  });
});
