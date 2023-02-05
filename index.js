const Discord = require('discord.js');
const client = new Discord.Client({ intents: 32767 });

const { token, prefix } = require('./config.json');

const { readdir } = require('fs/promises');
const { join } = require('path');

const context = {
    commands: new Discord.Collection()
};

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix)) return;

    let [commandName, ...args] = message.content
        .slice(prefix.length)
        .trim().split('/ +/');

    const command = context.commands.get(commandName);
    if (!command) return;

    if (command.permissions && !message.member.permissions.has(command.permissions)) {
        message.reply({
            content: 'You do not have permissions to use that command!',
            allowedMentions: { repliedUser: false }
        });

        return;
    };
    
    const userId = message.author.id;

    try {
        return command.execute(message, args);
    } catch (err) {
        console.error(err);
    };
});

(async () => {
    const commandDirs = await readdir(join(__dirname, 'commands'), {
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
        };
    };
})();

client.login(token);