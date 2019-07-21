import flow from 'lodash/fp/flow'
import shuffle from 'lodash/fp/shuffle'
import flatMap from 'lodash/fp/flatMap'
import { Pile } from './pile.model'
import { Card, CardSuit } from './card.model'
import { MoveCommand } from './command.model'
import { CommandManager } from './command-manager.model'

// client
export class Game {
  piles // Pile[]

  constructor () {
    const cards = flow(
      flatMap(suit => new Array(13).fill(0).map((empty, index) => new Card(index + 1, suit))),
      shuffle
    )(Object.values(CardSuit))

    // receiver
    this.piles = new Array(8).fill(0).map((empty, index) => new Pile(cards.slice(index * (index < 4 ? 7 : 6), (index + 1) * (index < 4 ? 7 : 6))))

    // invoker
    this.commandManager = new CommandManager()
  }

  get data () {
    const { piles, commandManager } = this

    return { piles, commandManager }
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
