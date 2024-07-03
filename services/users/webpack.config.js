const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  entry: "./src/main.ts", // Adjust the entry file accordingly
  target: "node",
  output: {
    path: path.resolve(__dirname, "..", "..", "dist", "users"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
    // Include 'pnpm' workspace packages
    modules: [path.resolve(__dirname, "..", "..", "node_modules")],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  externals: [
    nodeExternals({
      modulesDir: path.resolve(__dirname, "..", "..", "node_modules"),
    }),
  ],
};
