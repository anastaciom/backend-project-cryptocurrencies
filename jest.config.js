module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testMatch: [
    "**/tests/**/*.test.js"
  ],
  preset: "@shelf/jest-mongodb"
};
