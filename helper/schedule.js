const cron = require("node-cron");
const Streak = require("../data/schema");
const { fetchLastSubmissionTimestamp } = require("./fetchSubmissionDate");

// Function to fetch and update streaks for a specific group
const updateStreaksForGroup = async (channel) => {
  try {
    // Fetch users from the database for the specified channel
    const users = await Streak.find({ channel: channel });

    for (const user of users) {
      // Fetch the last submission timestamp
      const lastSubmissionTimestamp = await fetchLastSubmissionTimestamp(
        user.leetcodeUsername
      );

      if (lastSubmissionTimestamp) {
        const lastSubmissionDate = new Date(lastSubmissionTimestamp);

        // Update user's last submission and check streak
        const currentStreak = user.streak || 0;
        const previousDate = new Date(user.lastSubmission);

        // Determine if streak is maintained
        const diffInDays = Math.floor(
          (lastSubmissionDate - previousDate) / (1000 * 60 * 60 * 24)
        );
        const newStreak = diffInDays === 1 ? currentStreak + 1 : 1; // Reset streak if day is skipped

        // Update the user record in MongoDB
        await Streak.updateOne(
          { userId: user.userId },
          {
            lastSubmission: lastSubmissionDate,
            streak: newStreak,
          }
        );
      }
    }

    console.log(`Streaks updated for channel ${channel}`);
  } catch (error) {
    console.error(`Error updating streaks for channel ${channel}:`, error);
  }
};

// Schedule jobs for different channels/groups
cron.schedule("0 0 */2 * *", () => updateStreaksForGroup("A")); // Every 2 days at midnight
cron.schedule("0 0 */3 * *", () => updateStreaksForGroup("B")); // Every 3 days at midnight
cron.schedule("0 0 */4 * *", () => updateStreaksForGroup("C")); // Every 4 days at midnight
cron.schedule("0 0 */5 * *", () => updateStreaksForGroup("D")); // Every 5 days at midnight
