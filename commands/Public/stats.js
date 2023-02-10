    const { MessageEmbed, Message } = require('discord.js');
const { commandCount } = require('../../config.json');

module.exports = {
    name: 'stats',
    aliases: ['botinfo', 'botstats', 'info', 'i'],

    execute: async (message, args, client) => {
        const serverCount = client.guilds.cache.size;
        const userCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

        const djsVersion = require('discord.js').version;
        const nodeVersion = process.version;
        const uptime = process.uptime();
        const cpuStat = require('cpu-stat');

        const days = Math.floor(uptime / 86400);
        const hours = Math.floor(uptime / 3600) % 24;
        const minutes = Math.floor(uptime / 60) % 60;
        const seconds = Math.floor(uptime % 60);

        // const uptimeFormatted = `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
        const uptimeFormatted = `${days}d ${hours}h ${minutes}m ${seconds}s`

        cpuStat.usagePercent(function (error, percent) {
            const cpu = percent.toFixed(2);

            const embed = new MessageEmbed()
                .setTitle(`${client.user.username}'s Stats`)
                .setColor('#2F3136')
                .addFields(
                    { name: 'Latency', value: `${Date.now() - message.createdTimestamp}ms`, inline: true },
                    { name: 'Servers', value: `${serverCount.toString()}`, inline: true },
                    { name: 'CPU usage', value: `${cpu}%`, inline: true },
                    { name: 'Node.js version', value: nodeVersion, inline: true },
                    { name: 'Discord.js version', value: `v${djsVersion}`, inline: true },
                    { name: 'Uptime', value: uptimeFormatted, inline: true },
                )
                .setFooter({ text: `${client.user.tag}`, iconURL: client.user.displayAvatarURL({ size: 4096 }) });

            return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
        });
    }
}