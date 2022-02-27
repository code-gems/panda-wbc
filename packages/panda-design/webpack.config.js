const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
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
		// new CopyPlugin({
		// 	patterns: [
		// 		{ from: "./src/index.html", to: path.resolve(__dirname, "dist") },
		// 	],
		// }),
		new HtmlWebpackPlugin({
			name: "Panda Design",
			hash: true,
			template: "./src/index.html"
		})
	],
	devServer: {
		static: {
			directory: path.resolve(__dirname, "dist"),
		},
		port: 8080,
	},
};
