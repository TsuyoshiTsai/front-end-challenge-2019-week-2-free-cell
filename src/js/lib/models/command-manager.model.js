export class CommandManager {
  history // ICommand[]
  LIMITATION = 20

  constructor () {
    this.history = []
  }

  fitHistoryToLimitation () {
    this.history = this.history.slice(-this.LIMITATION)
  }

  execute (command) {
    command.do()

    this.history = [...this.history, command]
    this.fitHistoryToLimitation()
  }

  unexecute () {
    const [lastCommand] = this.history.slice(-1)
    lastCommand.undo()

    this.history = this.history.slice(0, this.history.length - 1)
  }
}
