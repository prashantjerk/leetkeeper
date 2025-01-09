const { SlashCommandBuilder } = require("discord.js");
const channelMap = require("../../data/channelMap");
const {
  fetchLastSubmissionTimestamp,
} = require("../../helper/fetchSubmissionDate");
const { getProfile } = require("../../helper/getProfile");

const allowedChannels = ["1324149203764510820"];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("check-streak")
    .setDescription("Check your streak"),
  async execute(interaction) {
    try {
      // Validate channel
      if (!allowedChannels.includes(interaction.channelId)) {
        await interaction.reply({
          content:
            "This command can only be used in the #check-streak channel.",
          ephemeral: true,
        });
        return;
      }

      const profile = await getProfile(interaction);
      if (!profile) return;

      // Show deferred reply while processing
      await interaction.deferReply({ ephemeral: true });

      // Fetch last submission timestamp
      const lastSubmissionTimestamp = await fetchLastSubmissionTimestamp(
        profile.leetcodeUsername
      );

      // Format response
      const replyMessage = `
**Your Streak Information**
- User ID: **${profile.userId}**
- LeetCode Username: **${profile.leetcodeUsername}**
- Current Streak: **${profile.streak}**
- Last Submission: **${lastSubmissionTimestamp}**
- Channel: **${channelMap[profile.channel] || "Not Set"}**
`;

      await interaction.editReply({
        content: replyMessage,
        ephemeral: true,
      });
    } catch (error) {
      console.error("Error in check-streak command:", error);

      const errorMessage = interaction.deferred
        ? interaction.editReply
        : interaction.reply;

      await errorMessage.call(interaction, {
        content:
          "An error occurred while checking your streak. Please try again later.",
        ephemeral: true,
      });
    }
  },
};
