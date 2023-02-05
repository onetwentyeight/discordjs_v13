module.exports = {
    name: 'ping',
    permissions: [],

    execute: async (message, args) => {
        message.channel.send('Pong!');
    }
}