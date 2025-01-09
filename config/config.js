const { GatewayIntentBits } = require("discord.js");

const botIntents = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.MessageContent, // Add this intent - it's required for message content
];

module.exports = { botIntents };
