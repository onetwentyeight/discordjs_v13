const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    aliases: [],
    permissions: ['BAN_MEMBERS'],

    execute: async (message, args) => {
        const target = message.mentions.users.first();

        if (target) {
            const memberTarget = message.guild.members.cache.get(target.id);

            const embed = new MessageEmbed()
                .setTitle('Success!')
                .setDescription(`You have banned ${memberTarget} from ${message.guild.name}`)
                .setFooter('To unban, please go to **Server Settings → Bans**')
                .setColor('#2F3136');

            memberTarget.ban();
            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        } else {
            const embed = new MessageEmbed()
                .setTitle('Error!')
                .setDescription('Please specify a user to ban.')
                .setColor('#2F3136');

            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        }
    }
}