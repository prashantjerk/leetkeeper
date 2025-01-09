const Streak = require("../data/schema");


const getProfile = async (interaction) => {
    try {
      const user = await Streak.findOne({ userId: interaction.user.id });
      if (!user) {
        await interaction.reply({
          content:
            "First, you have to link your profile through the #link-profile channel.",
          ephemeral: true,
        });
        return null; // Returning null ensures the rest of the code doesn't execute
      }
      return user;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      await interaction.reply({
        content:
          "An error occurred while fetching your profile. Please try again later.",
        ephemeral: true,
      });
      return null;
    }
  };

  module.exports = { getProfile }