import { Enum } from '../utils/enum'

export const CardSuit = Enum('spade', 'heart', 'diamond', 'club')
export const CardColor = Enum('red', 'black')

export class Card {
  rank // number
  suit // CardSuit
  isLast // boolean

  constructor (rank, suit) {
    this.rank = rank || 1
    this.suit = suit || CardSuit.spade
    this.isLast = false
  }

  get data () {
    const { rank, suit, isLast } = this

    return { rank, suit, isLast }
  }

  get color () {
    switch (this.suit) {
      case CardSuit.spade:
      case CardSuit.club:
        return CardColor.black

      case CardSuit.heart:
      case CardSuit.diamond:
        return CardColor.red
    }
  }
}
