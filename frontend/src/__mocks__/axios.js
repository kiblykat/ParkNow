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
  get: jest.fn(),
};

export default mockAxios;
