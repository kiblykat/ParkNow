// jest.config.js
module.exports = {
  // Other Jest configuration options...
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)", // Adjust the pattern to include axios
  ],
  moduleNameMapper: {
    "^@uidotdev/usehooks$": "<rootDir>/src/mocks/@uidotdev/usehooks/index.js", // Replace <path_to_mock_file> with the path to a mock file for @uidotdev/usehooks
  },
  testEnvironment: "jsdom",
};
