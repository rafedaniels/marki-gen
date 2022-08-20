const { Client, Intents } = require('discord.js');
const WOK = require('wokcommands');
const path = require('path');

const { token, prefix } = require('./conf');

const client = new Client({
	// Recommended Intents
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS
	]
});

client.on('ready', () => {
	console.log(`Client ready on ${client.user.tag}`);
	new WOKCommands(client, {
		commandsDir: path.join(__dirname, 'commands'),
		featuresDir: path.join(__dirname, 'features'),
		messagesPath: '',
		typeScript: true,
		showWarns: true,
		delErrMsgCooldown: -1,
		defaultLangauge: 'english',
		ignoreBots: false,
		ephemeral: true,
		dbOptions: {
			keepAlive: true
		},
		testServers: [], // Put your test servers here
		botOwners: [], // Put your Discord ID here
		disabledDefaultCommands: [
			// 'help',
			// 'command',
			// 'language',
			// 'prefix',
			// 'requiredrole',
			// 'channelonly'
		],
		mongoUri: 'MONGO_URI', // Your mongo URI here
		debug: false
	})
		.setDefaultPrefix(prefix)
		.setColor(0xff0000);
});

client.login(token);
