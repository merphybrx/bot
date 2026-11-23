require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Events,
  MessageFlags
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const guildID = process.env.GUILD_ID

client.once(Events.ClientReady, async () => {

});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("pong");
  }

  if (interaction.commandName === "ban") {
    const target = interaction.options.getMember('member');
    
    if (!target) {
      return interaction.reply({
        content: 'Member not found', flags: MessageFlags.Ephemeral
      });
    }

    if (!target.bannable) {
      return interaction.reply({
        content: "Member can't be banned", flags: MessageFlags.Ephemeral
      });
    }

    await target.ban();
    await interaction.reply({
      content: '${target.user.tag} banned.', flags: MessageFlags.Ephemeral
    });
  }
});

client.login(process.env.DISCORD_TOKEN);