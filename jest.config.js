module.exports = {
  roots: ["<rootDir>/tests"],
  testMatch: ["**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        includeFailureMsg: true,
        statusIgnoreFilter: "pending",
        dateFormat: "dd-mm-yyyy HH:MM:ss",
        outputPath: "ui-report/index.html",
        pageTitle: "Firestore Rules Unit Test Result",
      },
    ],
  ],
  testEnvironment: "node",
}
