const { SlashCommandBuilder } = require("discord.js");
const Streak = require("../../data/schema");

const allowedChannels = ["1324141228195053649"];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("link-profile")
    .setDescription("Link your Discord account to your LeetCode profile.")
    .addStringOption((option) =>
      option
        .setName("username")
        .setDescription("Your LeetCode username")
        .setRequired(true)
    ),
  async execute(interaction) {
    // Check if the command is executed in an allowed channel
    if (!allowedChannels.includes(interaction.channelId)) {
      await interaction.reply({
        content: "This command can only be used in #link-profile.",
        ephemeral: true,
      });
      return;
    }

    const discordUserId = interaction.user.id;
    const leetCodeUsername = interaction.options.getString("username");

    try {
      // Verify database connection
      if (!Streak.db.readyState) {
        console.error("Database connection not ready");
        await interaction.reply({
          content: "Database connection error. Please try again later.",
          ephemeral: true,
        });
        return;
      }

      // Check if the user already exists
      const existingProfile = await Streak.findOne({ userId: discordUserId });

      if (existingProfile) {
        // Update existing profile
        try {
          if (leetCodeUsername == existingProfile.leetcodeUsername) {
            await interaction.reply({
              content: `Profiles already linked.`,
              ephemeral: true,
            });
            return;
          }

          existingProfile.leetcodeUsername = leetCodeUsername;
          await existingProfile.save();
          await interaction.reply({
            content: `Your LeetCode username has been updated to **${leetCodeUsername}**.`,
            ephemeral: true,
          });
        } catch (saveError) {
          console.error("Error saving existing profile:", saveError);
          throw saveError;
        }
      } else {
        // Create new profile
        try {
          await Streak.create({
            userId: discordUserId,
            leetcodeUsername: leetCodeUsername,
          });
          await interaction.reply({
            content: `Successfully linked your Discord account to LeetCode profile: **${leetCodeUsername}**.`,
            ephemeral: true,
          });
        } catch (createError) {
          console.error("Error creating new profile:", createError);
          throw createError;
        }
      }
    } catch (error) {
      console.error("Detailed error in link-profile:", {
        error: error.message,
        stack: error.stack,
        userId: discordUserId,
        username: leetCodeUsername,
      });

      // Provide more specific error messages based on error type
      let errorMessage =
        "There was an error linking your profile. Please try again later.";

      if (error.name === "ValidationError") {
        errorMessage =
          "Invalid LeetCode username format. Please check and try again.";
      } else if (error.code === 11000) {
        errorMessage =
          "This LeetCode username is already linked to another Discord account.";
      }

      await interaction.reply({
        content: errorMessage,
        ephemeral: true,
      });
    }
  },
};
