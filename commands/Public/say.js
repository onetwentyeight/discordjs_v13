module.exports = {
    name: 'say',
    permissions: ['MANAGE_MESSAGES'],

    execute: async (message, args) => {
        //message.delete();
        message.channel.send(args);
    }
}