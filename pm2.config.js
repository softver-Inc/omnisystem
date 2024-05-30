module.exports = {
  apps: [
    {
      name: "file-manager",
      script: "./services/file-manager/dist/main.js",
      exec_mode: "cluster",
      instances: 2,
      watch: false,
    },
    {
      name: "users",
      script: "./services/users/dist/main.js",
      watch: false,
    },
  ],
};
