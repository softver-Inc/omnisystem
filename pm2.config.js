module.exports = {
  apps: [
    {
      name: "file-manager",
      script: "./dist/file-manager/main.js",
      instances: 10, // Number of instances to run
      exec_mode: "cluster", // Enable cluster mode for load balancing
      autorestart: true, // Automatically restart the app if it crashes
      watch: false, // Watch for file changes and restart the app
      max_memory_restart: "1G", // Restart the app if it uses more than 1GB of memory
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "users",
      script: "./dist/users/main.js",
      instances: 10, // Number of instances to run
      exec_mode: "cluster", // Enable cluster mode for load balancing
      autorestart: true, // Automatically restart the app if it crashes
      watch: false, // Watch for file changes and restart the app
      max_memory_restart: "1G", // Restart the app if it uses more than 1GB of memory
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
