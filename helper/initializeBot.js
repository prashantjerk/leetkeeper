const { Client, Collection, Events, REST, Routes } = require("discord.js");
const { botIntents } = require("../config/config");
require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");

const client = new Client({
  intents: botIntents,
});

// Initialize bot and commands
const initializeBot = async () => {
  try {
    // Initialize Collections
    client.slashCommands = new Collection();

    // Load commands
    const foldersPath = path.join(__dirname, "../commands");
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
      const commandsPath = path.join(foldersPath, folder);
      const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ("data" in command && "execute" in command) {
          client.slashCommands.set(command.data.name, command);
        }
      }
    }

    // Deploy slash commands
    const rest = new REST().setToken(process.env.DISCORD_TOKEN);

    console.log("Deploying slash commands...");
    const commandsData = Array.from(client.slashCommands.values()).map((cmd) =>
      cmd.data.toJSON()
    );

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.APPLICATION_ID,
        process.env.GUILD_ID
      ),
      { body: commandsData }
    );

    // Set up event handlers
    client.on("ready", () => {
      console.log("Logged in as " + client.user.tag);
    });

    // Handle slash commands
    client.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const command = client.slashCommands.get(interaction.commandName);
      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        await interaction.reply({
          content: "Command not found.",
          ephemeral: true,
        });
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}:`, error);
        await interaction.reply({
          content: "An error occurred while executing the command.",
          ephemeral: true,
        });
      }
    });

    // Login to Discord
    await client.login(process.env.DISCORD_TOKEN);
    console.log("Bot initialized successfully");
  } catch (error) {
    console.error("Bot initialization failed:", error);
    throw error;
  }
};

module.exports = { initializeBot };
