const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    index: path.resolve("./src/app/index.jsx"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          configFile: "./babel.config.json",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  experiments: {
    outputModule: true,
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".css"],
  },
  output: {
    filename: "[name].js",
    library: {
      type: "module",
    },
  },
};
