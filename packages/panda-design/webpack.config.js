const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
	mode: "development",
	entry: {
		main: "./src/app.ts",
	},
	output: {
		filename: "app.js",
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
	plugins: [
		new HtmlWebpackPlugin()
	],
	devServer: {
		static: {
			directory: path.resolve(__dirname, "dist"),
		},
		port: 8080,
	},
};
