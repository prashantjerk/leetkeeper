const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("This is the /ping command"),
  async execute(interaction) {
    await interaction.reply("pong!");
  },
};
