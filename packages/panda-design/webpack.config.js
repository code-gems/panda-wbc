const path = require("path");
module.exports = {
	entry: {
		main: "./src/index.ts",
	},
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "./dist"),
	},
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, "dist"),
		},
		port: 8080,
	},
};
