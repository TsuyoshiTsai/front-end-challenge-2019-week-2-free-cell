class ICommand {
  do // Function
  undo // Function
}

export class MoveCommand extends ICommand {
  from // Pile
  to // Pile
  size // number

  constructor (from, to, size) {
    super()

    this.from = from
    this.to = to
    this.size = size
  }

  do () {
    const { from, to, size } = this

    to.addCards(from.cards.slice(-size))
    from.removeCards(size)
  }

  undo () {
    const { from, to, size } = this

    from.addCards(to.cards.slice(-size))
    to.removeCards(size)
  }
}
