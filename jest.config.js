module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**",
    "!src/server.js",
    "!src/config/mailer.js",
    "!src/config/mailerForgotPassword.js",
    "!src/config/database.js",
    "!swagger.json",
  ],
  coverageDirectory: "tests/coverage",
  coverageProvider: "v8",
  testMatch: ["**/tests/**/*.test.js"],
  preset: "@shelf/jest-mongodb",
};
