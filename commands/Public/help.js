const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../config.json');

module.exports = {
    name: 'help',
    aliases: ['h', 'commands', 'cmds', 'commandlist'],

    execute: async (message, args) => {
        const embed = new MessageEmbed()
            .setTitle('Help')
            .setDescription(`Command list. My prefix is \`${prefix}\``)
            .setColor('#2F3136')
            .addFields(
                { name: '🌐 Public', value: '`8ball` `help` `avatar` `feedback` `stats`', inline: false },
                { name: '🔨 Moderation', value: '`kick` `ban`', inline: false },
                { name: '📜 Information', value: '`serverinfo` `userinfo/whois`' }
            );

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
}