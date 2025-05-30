module.exports = {
	preset: "ts-jest",
	testEnvironment: "node", // or "jsdom" depending on your component
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	transform: {
	  "^.+\\.(ts|tsx)?$": "ts-jest",
	},
	testMatch: ["**/__tests__/**/*.(ts|tsx|js)", "**/?(*.)+(spec|test).(ts|tsx|js)"],
  };