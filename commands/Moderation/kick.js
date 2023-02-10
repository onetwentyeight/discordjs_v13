const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    aliases: [],
    permissions: ['KICK_MEMBERS'],

    execute: async (message, args) => {
        const target = message.mentions.users.first();

        if (target) {
            const memberTarget = message.guild.members.cache.get(target.id);

            const embed = new MessageEmbed()
                .setTitle('Success!')
                .setDescription(`You have kicked ${memberTarget} from ${message.guild.name}`)
                .setColor('#2F3136')
                .setTimestamp();

            memberTarget.kick();
            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        } else {
            const embed = new MessageEmbed()
                .setTitle('Error!')
                .setDescription('Please specify a user to kick.')
                .setColor('#2F3136');

            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        }
    }
}