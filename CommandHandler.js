class CommandHandler {
  constructor() {
    this.commands = [];
  }

  registerCommand(command) {
    this.commands.push(command);
  }

  getCommand(label) {
    let command = this.commands.find(cmd => cmd.label == label);

    return command;
  }
}

module.exports = CommandHandler;
