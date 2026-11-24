const {
  PermissionFlagsBits,
  MessageFlags,
  SlashCommandBuilder,
} = require("discord.js");

const { errorEmbed } = require('../utils/errorEmbed');

const errorTitle = 'Failed to Delete'

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delete')
    .setDescription('delete msges in the chat')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(option =>
      option
        .setName('amount')
        .setDescription('number')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(500)
    ),

  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');

    if (!interaction.channel?.bulkDelete) {
      return interaction.reply({
        components: [
          errorEmbed(errorTitle, "Messages cant be deleted here")
        ],
        flags: MessageFlags.IsComponentsV2
      });
    }

    if (!interaction.appPermissions?.has(
      PermissionFlagsBits.ManageMessages
    )) {
      return interaction.reply({
        components: [
          errorEmbed(errorTitle, 'Not enough perms')
        ],
        flags: MessageFlags.IsComponentsV2
      });
    }

    await interaction.deferReply({
      content: 'deleted',
      flags: MessageFlags.Ephemeral
    });

    try {
      const deleted = await interaction.channel.bulkDelete(
        amount,
        true
      );

      await interaction.editReply({
        content: 'deleted'
      });
    } catch (error) {
      console.error(error);

      await interaction.editReply({
        components: [
          errorEmbed(errorTitle, 'Failed')
        ],
        flags: MessageFlags.IsComponentsV2
      });
    }
  },
};