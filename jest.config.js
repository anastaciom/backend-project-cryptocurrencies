module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**","!src/database/config.js","!src/server.js", "!src/config/mailer.js","!src/config/mailerForgotPassword.js"],
  coverageDirectory: "tests/coverage",
  coverageProvider: "v8",
  testMatch: [
    "**/tests/**/*.test.js"
  ],
  preset: "@shelf/jest-mongodb"
};
