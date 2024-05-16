import React from "react";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // to use toBeInTheDocument
import Search from "./Search.jsx";
import { GlobalProvider } from "../context/GlobalContext.jsx";

//auto imports jest modules from __mocks__ folder
jest.mock("axios");

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
