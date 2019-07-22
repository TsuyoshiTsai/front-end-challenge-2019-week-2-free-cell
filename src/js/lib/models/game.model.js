import flow from 'lodash/fp/flow'
import shuffle from 'lodash/fp/shuffle'
import flatMap from 'lodash/fp/flatMap'
import { ColumnPile, ParkingPile, FundationPile } from './pile.model'
import { Card, CardSuit } from './card.model'
import { MoveCommand } from './command.model'
import { CommandManager } from './command-manager.model'

// client
export class Game {
  columnPiles // IPile[]

  constructor () {
    const cards = flow(
      flatMap(suit => new Array(13).fill(0).map((empty, index) => new Card(index + 1, suit))),
      shuffle
    )(Object.values(CardSuit))

    // receiver
    this.columnPiles = new Array(8)
      .fill(0)
      .map((empty, index) => new ColumnPile(cards.slice(index * (index < 4 ? 7 : 6), (index + 1) * (index < 4 ? 7 : 6))))

    this.parkingPiles = new Array(4).fill(0).map(() => new ParkingPile())
    this.fundationPiles = new Array(4).fill(0).map(() => new FundationPile())

    // invoker
    this.commandManager = new CommandManager()
  }

  get data () {
    const { columnPiles, parkingPiles, fundationPiles, commandManager } = this

    return { columnPiles, parkingPiles, fundationPiles, commandManager }
  }

  get canUndo () {
    return this.commandManager.history.length > 0
  }

  move (from, to, size) {
    this.commandManager.execute(new MoveCommand(from, to, size))
  }

  undo () {
    this.commandManager.unexecute()
  }
}