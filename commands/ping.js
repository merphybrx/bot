const {
  PermissionFlagsBits,
  MessageFlags,
  SlashCommandBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('bans'),
    
  async execute(interaction) {
    return interaction.reply({
      content: 'pong'
    })
  }
}