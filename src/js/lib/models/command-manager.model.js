export class CommandManager {
  history // ICommand[]
  LIMITATION = 2

  constructor () {
    this.history = []
  }

  execute (command) {
    command.do()

    this.history = [...this.history, command].slice(-this.LIMITATION)
  }

  unexecute () {
    const [lastCommand] = this.history.slice(-1)
    lastCommand.undo()

    this.history = this.history.slice(0, this.history.length - 1)
  }
}
