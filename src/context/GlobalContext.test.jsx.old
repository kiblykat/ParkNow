import axios from "axios";
const apiGetFav = require("./GlobalContext.jsx");

// jest.mock("axios");

describe("apiGetFav", () => {
  it("returns favorite list", () => {
    const mockedSetFavoriteList = jest.fn(); //mock function
    expect(mockedSetFavoriteList).toHaveBeenCalled(1);
  });
});

// describe('apiGetFav function', () => {
//   it('fetches favorites from the API and sets favorite list', async () => {
//     const mockResponseData = [{ id: 1, name: 'Favorite 1' }, { id: 2, name: 'Favorite 2' }];
//     const mockedSetFavoriteList = jest.fn();
//     const mockedConsoleLog = jest.spyOn(console, 'log');
//     axios.get.mockResolvedValueOnce({ data: mockResponseData });

//     await apiGetFav(mockAPI, mockedSetFavoriteList);

//     expect(mockAPI.get).toHaveBeenCalledWith('/favorites');
//     expect(mockedSetFavoriteList).toHaveBeenCalledWith(mockResponseData);
//     expect(mockedConsoleLog).toHaveBeenCalledWith('response.data is: ', mockResponseData);
//     expect(mockedConsoleLog).toHaveBeenCalledWith('favoriteList is: ', mockResponseData);
//     expect(mockedConsoleLog).toHaveBeenCalledWith('favorite list: ', mockResponseData);
//   });

//   it('handles errors when fetching favorites', async () => {
//     const mockErrorMessage = 'Network Error';
//     const mockedConsoleLog = jest.spyOn(console, 'log');
//     axios.get.mockRejectedValueOnce(new Error(mockErrorMessage));

//     await apiGetFav(mockAPI, jest.fn());

//     expect(mockAPI.get).toHaveBeenCalledWith('/favorites');
//     expect(mockedConsoleLog).toHaveBeenCalledWith(mockErrorMessage);
//     expect(mockedConsoleLog).toHaveBeenCalledWith('favorite list: ', undefined);
//   });
// });
