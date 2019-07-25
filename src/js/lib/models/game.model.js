import flow from 'lodash/fp/flow'
import shuffle from 'lodash/fp/shuffle'
import flatMap from 'lodash/fp/flatMap'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import { ColumnPile, ParkingPile, FundationPile } from './pile.model'
import { Card, CardSuit } from './card.model'
import { MoveCommand } from './command.model'
import { CommandManager } from './command-manager.model'

// client
export class Game {
  columnPiles // IPile[]
  parkingPiles // IPile[]
  fundationPiles // IPile[]
  commandManager // CommandManager

  constructor () {
    const cards = flow(
      flatMap(suit => new Array(13).fill(0).map((empty, index) => new Card(index + 1, suit))),
      shuffle
    )(Object.values(CardSuit))

    // receiver
    this.columnPiles = new Array(8).fill(0).map((empty, index) => {
      const count = index < 4 ? 7 : 6
      const patch = index < 4 ? 0 : 4
      const from = index * count + patch
      const to = from + count

      return new ColumnPile(cards.slice(from, to))
    })
    this.parkingPiles = new Array(4).fill(0).map(() => new ParkingPile())
    this.fundationPiles = Object.values(CardSuit).map(suit => new FundationPile(suit))

    // invoker
    this.commandManager = new CommandManager()

    this.initialData = {
      columnPiles: cloneDeep(this.columnPiles),
      parkingPiles: cloneDeep(this.parkingPiles),
      fundationPiles: cloneDeep(this.fundationPiles),
      commandManager: cloneDeep(this.commandManager),
    }
  }

  get data () {
    const { columnPiles, parkingPiles, fundationPiles, commandManager, initialData, canReset, canUndo, reset, move, undo } = this

    return { columnPiles, parkingPiles, fundationPiles, commandManager, initialData, canReset, canUndo, reset, move, undo }
  }

  canReset () {
    return !isEqual(this.columnPiles, this.initialData.columnPiles)
  }

  canUndo () {
    return this.commandManager.history.length > 0
  }

  reset () {
    this.columnPiles = cloneDeep(this.initialData.columnPiles)
    this.parkingPiles = cloneDeep(this.initialData.parkingPiles)
    this.fundationPiles = cloneDeep(this.initialData.fundationPiles)
    this.commandManager = cloneDeep(this.initialData.commandManager)

    return this
  }

  move (from, to, size) {
    this.commandManager.execute(new MoveCommand(from, to, size))

    return this
  }

  undo () {
    this.commandManager.unexecute()

    return this
  }
}
