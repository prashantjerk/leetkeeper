const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Set up error handlers for the connection
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    // Handle process termination
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });

    return true;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    return false;
  }
};

module.exports = connectDB;
