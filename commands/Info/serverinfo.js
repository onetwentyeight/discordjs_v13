const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    aliases: ['server'],
    permissions: ['MANAGE_SERVER'],

    execute: async (message, args, client) => {
        const guild = message.guild;
        const creationDateDynamic = `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`;

        const embed = new MessageEmbed()
            .setTitle(`${guild.name}'s Info`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setColor('#2F3136')
            .addFields(
                { name: 'ID', value: guild.id, inline: true },
                { name: 'Members', value: guild.memberCount.toString(), inline: true },
                { name: 'Created', value: creationDateDynamic, inline: true },
                { name: 'Region', value: guild.region || 'undefined', inline: true },
                { name: 'Roles', value: guild.roles.cache.size.toString(), inline: true }, /* value: guild.roles.cache.map(role => role.toString()).join('\n') */
                { name: 'Emojis', value: guild.emojis.cache.size, inline: true },
                { name: 'Channels', value: guild.channels.cache.size.toString(), inline: true }, /* guild.channels.cache.map(channel => channel.toString()).join(' ') */
            )
            .setTimestamp();

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    },
}