var { MessageEmbed } = require('discord.js');

module.exports = {
  label: 'twitch',
  execute: (message, args) => {
    let twitchUrl = 'https://www.twitch.tv/spacelampsix';

    let embed = new MessageEmbed()
      .setTitle('Check out My Twitch!')
      .setColor('#6441a5')
      .setURL(twitchUrl)
      .setDescription(twitchUrl)
      .setImage(
        'https://cdn.discordapp.com/avatars/279328984146247682/cdd066172cd34d38fdbe81133f2b8350.png'
      );

    message.channel.send(embed);
  },
};
