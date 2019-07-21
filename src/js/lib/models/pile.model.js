export class Pile {
  cards // Card[]

  constructor (cards) {
    this.cards = cards || []
    this.setLastCard()
  }

  get data () {
    const { cards } = this

    return { cards }
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
