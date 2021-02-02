const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {
		app: ["./src/App.tsx"],
		vendor: ["react", "react-dom"],
	},
	target: "node",
	output: {
		path: path.resolve(__dirname, "./../../dist/client"),
		filename: "js/[name].bundle.js",
	},
	devtool: "source-map",
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".scss"],
		fallback: {
			util: require.resolve("util/"),
			fs: false
		},
		alias:{
			path: path.resolve("node_modules", "path"),
			fs: path.resolve("node_modules", "fs")
		}
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader",
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "sass-loader",
						options: {
							implementation: require("sass"),
						},
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: "file-loader",
					},
				],
			},
		],
	},
	externals: {
		sqlite3: "commonjs sqlite3",
		crypto: "commonjs crypto-js"
		//fs: "commonjs fs",
		//path:"commonjs path"
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
		}),
	],
};
