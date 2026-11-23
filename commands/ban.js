const {
  PermissionFlagsBits,
  MessageFlags,
  SlashCommandBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('bans')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption(o => o.setName('member').setDescription('user to ban').setRequired(true)),

  async execute(interaction) {
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
      content: '${target.user.tag} banned', flags: MessageFlags.Ephemeral
    });
  },
};