const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'slowmode',
    aliases: ['slow'],
    permissions: ['MANAGE_CHANNELS'],

    execute: async (message, args) => {
        const author = message.author;
        const member = author.member;

        const embed = new MessageEmbed()
            .setTitle('Error!')
            .setColor('#2F3136');

        if (isNaN(args)) {
            embed
                .setDescription('Please provide a valid number.');

            return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        } else if (args[0] > 21600) {
            embed
                .setDescription('You can\'t set slowmode higher than 6 hours!');

            return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        } else if (args[0] < 0) {
            embed
                .setDescription('You can\'t set slowmode lower than 0 seconds!');

            return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        } else if (args > 0 && args < 1) {
            embed
                .setDescription('You can\'t set slowmode to a decimal number!');

            return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        } else if (args[0] === 0) {
            return message.channel.setRateLimitPerUser(0);
        }

        message.channel.setRateLimitPerUser(args[0]);
        // message.reply({ content: `Slowmode in this channel is now ${args[0]} seconds.`, allowedMentions: { repliedUser: false } });
    }
}