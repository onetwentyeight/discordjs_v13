const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'say',
    aliases: ['echo'],
    permissions: ['MANAGE_MESSAGES'],

    execute: async (message, args) => {
        let currentSlowmode = message.channel.rateLimitPerUser;

        if (!args[0])
            return message.reply({ content: `Slowmode in this channel is ${currentSlowmode}`, allowedMentions: { repliedUser: false } });

        if (isNaN(args[0]))
            return message.reply({ content: 'Please specify a valid time in seconds.', allowedMentions: { repliedUser: false } });

        message.channel.send({ content: args.join(' ') });
        message.delete();
    }
}