const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    aliases: ['av', 'pfp', 'icon'],
    permissions: [],

    execute: async (message, args) => {
        const target = message.mentions.users.first() || message.author;

        const embed = new MessageEmbed()
            .setTitle(`${target.username}'s avatar`)
            .setURL(target.displayAvatarURL({ size: 4096 }))
            .setColor('#2F3136')
            .setImage(target.displayAvatarURL({ size: 4096 }));

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
}