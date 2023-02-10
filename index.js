const Discord = require('discord.js');
const { token } = require('./config.json');

const manager = new Discord.ShardingManager('./main.js', { token: token });

manager.on('shardCreate', shard =>
  console.log(`[SHARD] Launched shard ${shard.id}`));

manager.on('shardDeath', (shard, code, signal) =>
  console.log(`[SHARD] Shard ${shard.id} has died with code ${code} and signal ${signal}`));

manager.spawn();