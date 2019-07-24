import uuidv4 from 'uuid/v4'

class IPile {
  cards // Card[]
  addCards // Function
  removeCards // Function
}

export class ColumnPile extends IPile {
  cards // Card[]

  constructor (cards) {
    super()

    this.id = uuidv4()
    this.cards = cards || []
    this.updateMovableCard()
  }

  updateMovableCard () {
    this.cards = this.cards.reduce((cards, card, index, array) => {
      if (index === array.length - 1) {
        // 最後一張的情況
        card.isMovable = true
      } else {
        // 超過一張，且不是最後一張的情況
        const nextCard = array[index + 1]

        card.isMovable = card.color !== nextCard.color && card.rank - 1 === nextCard.rank
      }

      return [...cards, card]
    }, [])
  }

  addCards (cards) {
    this.cards = [...this.cards, ...cards]
    this.updateMovableCard()
  }

  removeCards (size) {
    this.cards = this.cards.slice(0, -size)
    this.updateMovableCard()
  }
}

export class ParkingPile extends IPile {
  cards // Card[]

  constructor () {
    super()

    this.id = uuidv4()
    this.cards = []
  }

  addCards (cards) {
    this.cards = [...cards]
  }

  removeCards () {
    this.card = []
  }
}

export class FundationPile extends IPile {
  cards // Card[]

  constructor () {
    super()

    this.id = uuidv4()
    this.cards = []
  }

  addCards (cards) {
    this.cards = [...this.cards, ...cards]
  }

  // can't remove cards
  removeCards () {}
}
