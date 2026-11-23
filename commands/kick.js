const {
  PermissionFlagsBits,
  MessageFlags,
  SlashCommandBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('kicks')
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption(o => o.setName('member').setDescription('user to kick').setRequired(true)),

  async execute(interaction) {
    const target = interaction.options.getMember('member');
    
    if (!target) {
      return interaction.reply({
        content: 'Member not found', flags: MessageFlags.Ephemeral
      });
    }

    if (!target.kickable) {
      return interaction.reply({
        content: "Member can't be kicked", flags: MessageFlags.Ephemeral
      });
    }

    await target.kick();
    await interaction.reply({
      content: '${target.user.tag} kicked', flags: MessageFlags.Ephemeral
    });
  },
};