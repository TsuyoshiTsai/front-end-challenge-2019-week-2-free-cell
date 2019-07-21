export class CommandManager {
  history // ICommand[]
  LIMITATION = 20

  constructor () {
    this.history = []
  }

  fixHistoryToLimitation () {
    this.history = this.history.slice(-this.LIMITATION)
  }

  execute (command) {
    command.do()

    this.history = [...this.history, command]
    this.fixHistoryToLimitation()
  }

  unexecute () {
    const lastCommand = this.history.slice(-1)[0]
    lastCommand.undo()

    this.history = this.history.slice(0, this.history.length - 1)
  }
}
