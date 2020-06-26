module.exports = {
  label: 'clear',
  execute: (message, args) => {
    message.reply('this command is disabled right now!');

    /*
    message.channel.messages.fetch().then(messages => {
      message.channel.bulkDelete(messages);
	});
	*/
  }
};
