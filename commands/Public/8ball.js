const { MessageEmbed } = require('discord.js');

module.exports = {
  name: '8ball',
  aliases: ['8b'],

  execute: async (message, args) => {
    const responses =
      [
        'It is certain.',
        'It is decidedly so.',
        'Without a doubt.',
        'Yes - definitely.',
        'You may rely on it.',
        'As I see it, yes.',
        'Most likely.',
        'Outlook good.',
        'Yes.',
        'Signs point to yes.',
        'Reply hazy, try again.',
        'Ask again later.',
        'Better not tell you now.',
        'Cannot predict now.',
        'Concentrate and ask again.',
        'Don\'t count on it.',
        'My reply is no.',
        'My sources say no.',
        'Outlook not so good.',
        'Very doubtful.'
      ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    const embed = new MessageEmbed()
      .setColor('#2F3136')
      .setAuthor({ name: '8 Ball', iconURL: 'https://cdn.discordapp.com/attachments/1069253387226447955/1069634947654090815/8ball.png' })
      .setDescription(randomResponse);

    message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
  }
}