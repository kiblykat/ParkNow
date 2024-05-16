// const mockResponse = {
//   items: [
//     {
//       timestamp: "2024-05-16T08:23:27+08:00",
//       carpark_data: [
//         {
//           carpark_info: [
//             {
//               total_lots: "105",
//               lot_type: "C",
//               lots_available: "25",
//             },
//           ],
//           carpark_number: "HE12",
//           update_datetime: "2024-05-16T08:22:05",
//         },
//       ],
//     },
//   ],
// };

// const mockAxios = jest.genMockFromModule("axios");
// mockAxios.create = jest.fn(() => mockAxios);

// const axiosMock = () => {
//   // get: jest.fn().mockResolvedValue();
//   // create: jest.fn(() => jest.genMockFromModule("axios"));
// };

// export default axiosMock;

//mock axios create to fix "_axios.default.create is not a function"
const mockAxios = {
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
};

export default mockAxios;
