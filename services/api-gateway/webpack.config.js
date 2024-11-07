const { RunScriptWebpackPlugin } = require("run-script-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const path = require("path");

module.exports = (internal, props) => {
  const isDev = props.mode === "development";
  const isProd = props.mode === "production";

  const rootDir = path.resolve(__dirname, "..", "..");
  const rootNodeModules = path.resolve(rootDir, "node_modules"); // workspace shared node modules

  const sharedFolderResolver = path.resolve(rootDir); // Include the shared folder
  const currentFolderName = path.basename(__dirname);

  const developmentOutPutFolder = path.resolve(__dirname, "dist");
  const productionOutPutFolder = path.resolve(
    __dirname,
    "..",
    "..",
    "dist",
    currentFolderName
  );

  const plugins = isProd
    ? [
        /* not HotModuleReplacementPlugin & RunScriptWebpackPlugin only for development */
      ]
    : [
        new webpack.HotModuleReplacementPlugin({}),
        new RunScriptWebpackPlugin({
          name: "main.js",
          autoStart: false,
        }),
      ];

  const externals = isProd
    ? [
        /* not webpack/hot/poll?100 only for development */
        nodeExternals({
          modulesDir: rootNodeModules,
        }),
      ]
    : [
        nodeExternals({
          allowlist: ["webpack/hot/poll?100"],
          modulesDir: rootNodeModules,
        }),
      ];

  const entry = isProd
    ? ["./src/main.ts"]
    : ["webpack/hot/poll?100", "./src/main.ts"];

  return {
    entry,
    plugins,
    externals,
    watch: isDev,
    target: "node",
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
          include: [path.resolve(__dirname, "src"), sharedFolderResolver],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      // Include 'pnpm' workspace packages
      modules: [rootNodeModules, sharedFolderResolver],
    },
    output: {
      filename: "main.js",
      path: isProd ? productionOutPutFolder : developmentOutPutFolder,
    },
    optimization: {
      minimize: isProd,
    },
  };
};
