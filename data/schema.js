const mongoose = require("mongoose");

const streakSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  leetcodeUsername: {
    type: String,
    required: true, // The LeetCode username provided by the user
  },
  streak: {
    type: Number,
    default: 0,
  },
  lastSubmission: {
    type: Date,
  },
  channel: {
    type: String,
    enum: ["A", "B", "C", "D"],
    default: "A",
  },
  rejoinAttempts: {
    type: Number,
    default: 0,
  },
  lastRejoinDate: {
    type: Date,
    default: null,
  },
  totalSubmission: {
    type: Number,
    default: 0,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
});

const Streak = mongoose.model("Streak", streakSchema);

module.exports = Streak;
