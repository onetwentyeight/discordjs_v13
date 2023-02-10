const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'purge',
    aliases: ['clear', 'delete'],
    permissions: ['MANAGE_MESSAGES'],

    execute: async (message, args) => {
        const amount = parseInt(args[0]) + 1;
        const author = message.author;
        const member = message.guild.members.cache.get(author.id);

        const embed = new MessageEmbed()
            .setColor('#2F3136');

        try {
            if (isNaN(amount)) {
                embed
                    .setTitle('Error!')
                    .setDescription('That\'s not a valid number.');
                return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
            } else if (amount <= 1 || amount > 100) {
                embed
                    .setTitle('Error!')
                    .setDescription('Must be between 1 and 99.');
                return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
            }
            await message.channel.bulkDelete(amount, true);

        } catch (err) {
            console.error(err);
            message.channel.send({ content: 'An error occured!', allowedMentions: { repliedUser: false } });
        }
    },
}