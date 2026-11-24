const {
  PermissionFlagsBits,
  MessageFlags,
  SlashCommandBuilder,
} = require("discord.js");

const { errorEmbed } = require('../utils/errorEmbed');

const errorTitle = 'Failed to Kick'

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
        components: [
          errorEmbed(errorTitle, 'Member not found')
        ],
        flags: MessageFlags.IsComponentsV2
      });
    }

    if (!target.kickable) {
      return interaction.reply({
        components: [
          errorEmbed(errorTitle, "Member can't be kicked")
        ],
        flags: MessageFlags.IsComponentsV2
      });
    }

    await target.kick();
    await interaction.reply({
      content: '${target.user.tag} kicked', flags: MessageFlags.Ephemeral
    });
  },
};