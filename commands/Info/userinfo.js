const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'userinfo',
    aliases: ['whois'],
    permissions: ['MANAGE_ROLES'],

    execute: async (message, args) => {
        const guild = message.guild;
        const member =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]) || message.member;

        const user = member.user;

        const joinDateDynamic = `<t:${Math.floor(member.joinedAt.getTime() / 1000)}:R>`;
        const creationDateDynamic = `<t:${Math.floor(user.createdAt.getTime() / 1000)}:R>`;

        const embed = new MessageEmbed()
            .setTitle(`Who is ${user.username}?`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setColor('#2F3136')
            .addFields(
                { name: 'Tag', value: `\`${user.tag}\``, inline: false },
                { name: 'ID', value: user.id, inline: false },
                { name: 'Nickname', value: member.nickname || 'None', inline: true },
                { name: 'Roles', value: member.roles.cache.size.toString(), inline: true }, /* member.roles.cache.map(role => role.toString()).join(' ') */
                { name: 'Bot?', value: user.bot ? 'Yes' : 'No', inline: true },
                { name: 'Avatar URL', value: `[Click Here](${user.displayAvatarURL({ dynamic: true, size: 4096 })})`, inline: true },
                { name: `Joined ${guild.name}`, value: joinDateDynamic, inline: false },
                { name: 'Joined Discord', value: creationDateDynamic, inline: false },
            )
            .setTimestamp();

        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    },
}