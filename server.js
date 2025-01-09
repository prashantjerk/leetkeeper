const express = require("express");
const { initializeBot } = require("./helper/initializeBot");
const connectDB = require("./data/connectdb");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize everything
const initialize = async () => {
  try {
    // Connect to MongoDB first
    console.log("Connecting to MongoDB...");
    await connectDB();

    // Initialize the bot after DB connection
    console.log("Initializing bot...");
    await initializeBot();

    // Start Express server last
    app.all("/", (req, res) => {
      res.send("Buddy bot is running");
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Initialization failed:", error);
    process.exit(1);
  }
};

// Handle process termination
process.on("SIGINT", () => {
  console.log("Shutting down gracefully...");
  process.exit(0);
});

initialize();
