module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/context/(.*)$": "<rootDir>/context/$1",
    "^@/types/(.*)$": "<rootDir>/types/$1",
    "^@/utils/(.*)$": "<rootDir>/utils/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
