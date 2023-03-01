const Discord = require('discord.js');

const { token, prefix, cooldownTime } = require('./config.json');

const { join } = require('path');
const { readdir } = require('fs/promises');

const client = new Discord.Client({ intents: 32767 });

const context = { commands: new Discord.Collection() };

module.exports = client;

function activity() {
  client.user.setActivity({ name: `${client.guilds.cache.size} servers`, type: 'COMPETING' });
}

client.once('ready', () => {
  activity();
  console.log(`[READY] Logged in as ${client.user.tag}!\n────────────────────────────────────`);
});

const cooldowns = new Map();
const excludedUsers = ['1069278712295600159'];
const guildPrefixes = new Map();

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(prefix)) return;

  let guildPrefix = prefix;
  if (guildPrefixes.has(message.guild.id)) {
    guildPrefix = guildPrefixes.get(message.guild.id);
  }

  let [commandName, ...args] = message.content
    .slice(guildPrefix.length)
    .trim()
    .split(/ +/);
  commandName = commandName.toLowerCase();

  const command =
    context.commands.get(commandName) ||
    context.commands.find(x => x.aliases?.includes(commandName));
  if (!command) return;

  if (command.permissions && !message.member.permissions.has(command.permissions)) {
    message.reply({
      content: 'You do not have sufficient permissions to execute that command!',
      allowedMentions: { repliedUser: false }
    });
    return;
  }

  if (command)
    console.log(`[COMMAND] [${new Date().toDateString('en-US', { timeZone: 'Africa/Cairo' })}] ${message.author.tag} used ${guildPrefix}${command.name} ${args.join(' ')}`)

  const userId = message.author.id;

  if (excludedUsers.includes(userId)) return command.execute(message, args, client);

  const now = Date.now();
  const cooldownAmount = (command.cooldown || cooldownTime) * 1000;
  const timeLeft = cooldowns.get(userId + commandName) - now;

  if (timeLeft > 0) {
    if (command) {
      if (Math.round(timeLeft / 1000) === 1) {
        message.reply({
          content: `A little too quick there, ${message.author.username}. Please wait ${Math.round(timeLeft / 1000)} second before using the \`${commandName}\` command.`,
          allowedMentions: { repliedUser: false }
        });
      } else {
        message.reply({
          content: `A little too quick there, ${message.author.username}. Please wait ${Math.round(timeLeft / 1000)} seconds before using the \`${commandName}\` command.`,
          allowedMentions: { repliedUser: false }
        });
      }
    }
    return;
  }

  cooldowns.set(userId + commandName, now + cooldownAmount);
  setTimeout(() => {
    cooldowns.delete(userId + commandName);
  }, cooldownAmount);

  try {
    if (command.disabled)
      return message.reply({
        content: 'This command is currently disabled!',
        allowedMentions: { repliedUser: false }
      });

    return command.execute(message, args, client);
  } catch (err) {
    client.messages.send(message.channelId, 'There was an error executing that command!');
    console.error(err);
  }
});

(async () => {
  const commandDirs = await readdir(join(__dirname, 'commands'),
    {
      withFileTypes: true
    });
  for (const dir of commandDirs.filter(x => x.isDirectory())) {
    const commandFiles = await readdir(
      join(__dirname, 'commands', dir.name), { withFileTypes: true }
    );

    for (const file of commandFiles.filter(x => x.name.endsWith('.js'))) {
      const command = require(join(__dirname, 'commands', dir.name, file.name));
      command.permissions = command.permissions || [];
      context.commands.set(command.name, command);
    }
  }
})();

client.on('guildCreate', (guild) => {
  guildPrefixes.set(guild.id, defaultPrefix);
  
  const topChannel = guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').sort((a, b) => a.rawPosition - b.rawPosition || a.id - b.id).first();

  try {
    const embed = new Discord.MessageEmbed()
      .setColor('#2F3136')
      .setTitle('Hello!')
      .setDescription(`Thank you for adding me into your server! My prefix is \`${prefix}\`\nTo get started, type \`${prefix}help\` in any channel.`);

    topChannel.send({ embeds: [embed] });

    console.log(`[JOIN] Beverage is now in ${client.guilds.cache.size} servers!`);
    activity();
  } catch (error) {
    console.log(error);
  }
});

client.on('guildDelete', guild => {
  guildPrefixes.delete(guild.id);
  activity();
});

client.login(token);