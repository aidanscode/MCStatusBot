var Utilities = require('../Utilities');
var mc = require('minecraft-protocol');
let serverInfo = {
  host: '', //Put server IP address here
  port: 25565, //Put server port here (default 25565)
};

module.exports = {
  label: 'mc',
  execute: (message, args) => {
    let shouldListPlayers = args.length > 0 && args[0] == 'list';

    mc.ping(serverInfo, (error, response) => {
      if (error) {
        message.reply('unable to ping the server! It may be down');
        //Utilities.investigateFailedPing(message.channel);
      } else {
        let messageResponse =
          'there are currently ' +
          response.players.online +
          '/' +
          response.players.max +
          ' players online.';

        if (shouldListPlayers && 'sample' in response.players) {
          response.players.sample.forEach((p) => {
            messageResponse += '\n' + p.name;
          });
        }

        message.reply(messageResponse);
      }
    });
  },
};
