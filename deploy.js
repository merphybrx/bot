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

  console.log('started deploying cmds')

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.APP_ID,
        process.env.GUILD_ID
      ),
      { body: [] }
    );

    console.log('local commands deleted')

    const result = await rest.put(
      Routes.applicationCommands(process.env.APP_ID),
      { body: commands },
    );

    console.log(`${result.length} cmds updated`)
  } catch (error) {
    console.error(error)
  }
})();