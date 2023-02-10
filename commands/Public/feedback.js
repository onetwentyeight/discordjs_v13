const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'feedback',
    aliases: ['suggest', 'rate', 'comment'],
    permissions: [],
    cooldown: 3600,

    execute: async (message, args) => {
        const filter = (m) => m.author.id === message.author.id;

        const embed = new MessageEmbed()
            .setTitle('Feedback')
            .setDescription('Please enter your feedback below.\nSend "cancel" to cancel feedback.\n\n:warning: You can only send feedback once every hour.')
            .setColor('#2F3136');

        const msg = await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        const collected = await message.channel.awaitMessages({ filter, max: 1, time: 60000 });

        if (collected.first().content.toLowerCase() === 'cancel')
            return collected.first().reply({ content: 'Cancelled feedback.', allowedMentions: { repliedUser: false } });

        const feedbackMsg = collected.first();
        const feedback = collected.first().content;

        const feedbackEmbed = new MessageEmbed()
            .setTitle('Feedback')
            .setDescription(`**${feedback}**`)
            .setColor('#2F3136')
            .setFooter({ text: `From ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        const feedbackChannel = message.client.channels.cache.get('1070241209534119995');
        feedbackChannel.send({ embeds: [feedbackEmbed] });
        feedbackMsg.reply({ content: 'Thanks for your feedback! It means a lot!', allowedMentions: { repliedUser: false } })
    }
}