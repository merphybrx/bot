const {
  PermissionFlagsBits,
  MessageFlags,
  SlashCommandBuilder
} = require("discord.js");

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
        content: 'Messages cant be deleted here',
        flags: MessageFlags.Ephemeral
      });
    }

    if (!interaction.appPermission?.has(
      PermissionFlagsBits.ManageMessages
    )) {
      return interaction.reply({
        content: 'Not enough perms',
        flags: MessageFlags.Ephemeral
      });
    }

    await interaction.deferReply({
      flags: MessageFlags.Ephemeral
    });

    try {
      const deleted = await interaction.channel.bulkDelete(
        amount,
        true
      );
    } catch (error) {
      console.error(error);
    }
  },
};