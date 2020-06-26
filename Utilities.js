var exec = require('child_process').exec;

let functions = {
  isCommand: (str) => {
    return str.startsWith('!');
  },
  parseCommand: (str) => {
    let content = str.substring(1, str.length);
    let args = content.split(' ');

    return {
      label: args.shift(),
      args: args,
    };
  },
  checkServerStatus: (callback) => {
    exec('systemctl is-active minecraft', (err, stdout, stderr) => {
      if (err) callback(false);
      else {
        let isOnline = stdout.includes('active');
        callback(isOnline);
      }
    });
  },
  attemptStartServer: (callback) => {
    exec('systemctl start minecraft', (err) => {
      callback(err ? false : true);
    });
  },
  investigateFailedPing: (channel) => {
    channel.send('Manually checking service status...');

    functions.checkServerStatus((isServerOnline) => {
      if (isServerOnline)
        channel.send(
          'Confirmed service is running. It may be in the process of rebooting, please attempt to reconnect in a minute or two.'
        );
      else {
        channel.send(
          'Confirmed service is down. Attempting to reboot server...'
        );

        functions.attemptStartServer((success) => {
          if (!success)
            channel.send(
              'An error occurred while attempting to reboot the server!'
            );
          else
            channel.send(
              'A server reboot has been initiated, please rejoin in a few minutes.'
            );
        });
      }
    });
  },
};

module.exports = functions;
