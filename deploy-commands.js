require('dotenv').config();

const fs = require('node:fs');
const path = require('node:path');

const {
  REST,
  Routes,
} = require('discord.js');

const commands = fs
  .readdirSync(path.join(__dirname, 'commands'))
  .filter(f => f.endsWith('.js'))
  .map(f => require(path.join(__dirname, 'commands', f)).data.toJSON());

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
  await rest.put(
    Routes.applicationGuildCommands(process.env.APP_ID, process.env.HUILD_ID),
    { body: commands },
  );
});