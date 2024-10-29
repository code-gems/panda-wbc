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
		publicPath: "/"
	},
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]'
				},
				type: 'asset/resource',
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: "./assets", to: path.resolve(__dirname, "dist") },
			],
		}),
		new HtmlWebpackPlugin({
			name: "Panda Design",
			hash: true,
			template: "./src/index.html"
		})
	],
	watchOptions: {
		aggregateTimeout: 2000,
		poll: 2000,
		ignored: /node_modules/,
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, "dist"),
		},
		port: 8080,
		historyApiFallback: true,
		hot: true,
	},
};
