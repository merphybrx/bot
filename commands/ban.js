const {
  PermissionFlagsBits,
  MessageFlags,
  SlashCommandBuilder,
} = require("discord.js");

const { errorEmbed } = require('../utils/errorEmbed');

const errorTitle = 'Failed to Ban'

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
        components: [
          errorEmbed(errorTitle, 'Member not found')
        ],
        flags: MessageFlags.IsComponentsV2
      });
    }

    if (!target.bannable) {
      return interaction.reply({
        components: [
          errorEmbed(errorTitle, "Member can't be banned")
        ],
        flags: MessageFlags.IsComponentsV2
      });
    }

    await target.ban();
    await interaction.reply({
      content: '${target.user.tag} banned', flags: MessageFlags.Ephemeral
    });
  },
};