require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client();

client.prefix = 'ac!';

client.on('ready', () => {
    console.log(`${client.user.tag} se ha conectado`)
});

client.login(process.env.TOKEN); 

module.exports = client;