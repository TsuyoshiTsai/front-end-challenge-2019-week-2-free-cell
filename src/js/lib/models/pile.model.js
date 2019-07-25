import uuidv4 from 'uuid/v4'

class IPile {
  cards // Card[]
  addCards // Function
  removeCards // Function

  constructor () {
    this.cards = []
  }

  addCards (cards) {
    this.cards = [...this.cards, ...cards]
  }

  removeCards (size) {
    this.cards = this.cards.slice(0, -size)
  }
}

export class ColumnPile extends IPile {
  cards // Card[]
  movables // bool[]

  constructor (cards) {
    super()

    this.id = uuidv4()
    this.cards = cards || []
    this.movables = []
    this.updateMovable()
  }

  updateMovable () {
    const result = new Array(this.cards.length).fill(0).map(() => true)

    // 從倒數第二張開始
    for (let index = this.cards.length - 2; index >= 0; index--) {
      const card = this.cards[index]
      const nextCard = this.cards[index + 1]
      const nextCardMovable = result[index + 1]

      result[index] = nextCardMovable && this.isMovable(card, nextCard)
    }

    this.movables = result
  }

  isMovable (card, nextCard) {
    return card.color !== nextCard.color && card.rank - 1 === nextCard.rank
  }

  canMove (card) {
    return this.movables[this.cards.indexOf(card)]
  }

  canDrop (card) {
    const [lastCard] = this.cards.slice(-1)

    return this.isMovable(lastCard, card)
  }

  addCards (cards) {
    super.addCards(cards)
    this.updateMovable()
  }

  removeCards (size) {
    super.removeCards(size)
    this.updateMovable()
  }
}

export class ParkingPile extends IPile {
  cards // Card[]

  constructor () {
    super()

    this.id = uuidv4()
    this.cards = []
  }

  canMove (card) {
    return this.cards.indexOf(card) > -1
  }

  canDrop (cards) {}
}

export class FundationPile extends IPile {
  cards // Card[]
  suit // CardSuit

  constructor (suit) {
    super()

    this.id = uuidv4()
    this.suit = suit
    this.cards = []
  }

  canMove (card) {
    return this.cards.indexOf(card) === this.cards.length - 1
  }

  canDrop (cards) {}
}
