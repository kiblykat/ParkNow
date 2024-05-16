import React from "react";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // to use toBeInTheDocument
import Search from "./Search.jsx";
import GlobalContext, { GlobalProvider } from "../context/GlobalContext.jsx";

// jest.mock("axios");

// Create a mock value for the GlobalContext
const mockGlobalContextValue = {
  search: "mocked search value", // Provide a mock value for search
  setSearch: jest.fn(),
  getSlots: jest.fn(),
  filteredLots: [],
};

jest.mock("axios", () => {
  const mAxiosInstance = { get: jest.fn() };
  return {
    create: jest.fn(() => mAxiosInstance),
  };
});

describe("apiGetFav", () => {
  beforeAll(() => {
    axios.create.mockReturnThis();
  });
  it("contains word 'page' within document", async () => {
    render(
      <GlobalProvider>
        <Search />
      </GlobalProvider>
    );

    const headerElem = screen.getByText(/page:/i);
    expect(headerElem).toBeInTheDocument();
    // const mockedSetFavoriteList = jest.fn(); //mock function
    // expect(mockedSetFavoriteList).toHaveBeenCalled(1);
  });
});
