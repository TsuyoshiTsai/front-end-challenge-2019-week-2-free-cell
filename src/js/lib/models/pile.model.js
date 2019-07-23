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
    this.setLastCard()
  }

  setLastCard () {
    this.cards = this.cards.map((card, index) => {
      if (index === this.cards.length - 1) {
        card.isLast = true
      } else {
        card.isLast = false
      }

      return card
    })
  }

  addCards (cards) {
    this.cards = [...this.cards, ...cards]
    this.setLastCard()
  }

  removeCards (size) {
    this.cards = this.cards.slice(0, -size)
    this.setLastCard()
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
    this.cards = [cards]
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
