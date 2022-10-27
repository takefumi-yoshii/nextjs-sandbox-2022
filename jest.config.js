// https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler
const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jsdom",
  moduleNameMapper: {"^@/(.*)$": "<rootDir>/$1"},
  setupFiles: ["./jest.setup.js"],
  testMatch: ["<rootDir>/app/**/*.test.ts?(x)"],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  reporters: [
    "default",
    [
      "jest-html-reporters",
      {
        publicPath: "__reports__",
        filename: "jest.html",
      },
    ],
  ],
  watchPathIgnorePatterns: ["__reports__"],
};

module.exports = createJestConfig(customJestConfig);
