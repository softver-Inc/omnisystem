module.exports = {
  apps: [
    {
      name: "api-gateway",
      script: "./dist/api-gateway/main.js",
      instances: 3, // Number of instances to run
      exec_mode: "cluster", // Enable cluster mode for load balancing
      autorestart: true, // Automatically restart the app if it crashes
      watch: false, // Watch for file changes and restart the app
      max_memory_restart: "2G", // Restart the app if it uses more than 1GB of memory
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "users-service",
      script: "./dist/users-service/main.js",
      instances: 1, // Number of instances to run
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
