var auth = require('./auth.json');
var Discord = require('discord.js');
var CommandHandler = require('./CommandHandler');
var Utilities = require('./Utilities');
var client = new Discord.Client();

client.on('ready', () => {
  console.log('Successfully authenticated as %s!', client.user.username);
});

let commandHandler = new CommandHandler();
commandHandler.registerCommand(require('./commands/MCStatus'));
commandHandler.registerCommand(require('./commands/Twitch'));

client.on('message', (message) => {
  if (Utilities.isCommand(message.content)) {
    let { label, args } = Utilities.parseCommand(message.content);

    let command = commandHandler.getCommand(label);
    if (command != null) {
      command.execute(message, args);
    }
  }
});
client.login(auth.token);
