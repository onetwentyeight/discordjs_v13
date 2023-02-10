const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'channel',
    aliases: ['tc', 'ch', 'textchannel'],
    permissions: ['MANAGE_CHANNELS'],

    execute: async (message, args) => {
        if (args == 'new') {
            message.reply({ content: 'What do you want to name it?', allowedMentions: { repliedUser: false } });
            const filter = m => m.author.id === message.author.id;

            message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
                .then(collected => {
                    const name = collected.first().content;
                    message.guild.channels.create(name, { type: 'text' })
                        .then(channel => {
                            const embed = new MessageEmbed()
                                .setTitle('Success!')
                                .setDescription(`You have created the channel ${channel}`)
                                .setColor('#2F3136')

                            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
                        })
                        .catch(console.error);
                }
                );
        } else if (args == 'delete') {
            const filter = m => m.author.id === message.author.id;
            message.reply({ content: 'What channel do you want to delete?', allowedMentions: { repliedUser: false } });

            message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
                .then(collected => {
                    const channel = collected.first().mentions.channels.first();
                    channel.delete()
                        .then(channel => {
                            const embed = new MessageEmbed()
                                .setTitle('Success!')
                                .setDescription(`You have deleted that channel.`)
                                .setColor('#2F3136')

                            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
                        })
                        .catch(console.error);
                }
                );
        } else {
            const embed = new MessageEmbed()
                .setDescription('Command usage:\n`channel new` - Creates a channel\n`channel delete` - Deletes a channel')
                .setColor('#2F3136');

            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        }
    }
}