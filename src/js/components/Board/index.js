import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

// Components
import Brand from '../Brand'
import Typography from '../Typography'
import Pile from './components/Pile'
import Card from './components/Card'

// Lib MISC
import { TYPE } from './constants'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  game: PropTypes.object,
  setGame: PropTypes.func,
}

function Board (props) {
  const { game, setGame } = props

  // const onDragEnd = useCallback(
  //   ({ destination, source }) => {
  //     if (destination === null) return

  //     const [from] = game.columnPiles.filter(pile => pile.id === source.droppableId)
  //     const [to] = game.columnPiles.filter(pile => pile.id === destination.droppableId)
  //     const size = from.cards.length - source.index

  //     setGame({ ...game.move(from, to, size) })
  //   },
  //   [game, setGame]
  // )
  const handleDrop = ({ card, from }, monitor, to) => {
    const size = from.cards.length - from.cards.indexOf(card)

    setGame({ ...game.move(from, to, size) })
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={cx('board')}>
        <div className={cx('stack-container')}>
          <div className={cx('pile-list')}>
            {game.parkingPiles.map((pile, index) => (
              <div key={index} className={cx('card-list')}>
                <div className={cx('card', 'card--slot')} />

                {pile.cards.map((card, index) => (
                  <div key={index} className={cx('card-item')}>
                    {card.rank} {card.suit}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <Brand>
            <Brand.Image type='happy' />
            <Typography.Text size='sm' fontWeight={700} marginTop={3}>
              FREECELL
            </Typography.Text>
          </Brand>

          <div className={cx('pile-list')}>
            {game.fundationPiles.map((pile, index) => (
              <div key={index} className={cx('card-list')}>
                <div className={cx('card', 'card--fundation')}>
                  <img src={require(`../../../assets/images/cards/${pile.suit.description}.png`)} alt={pile.suit.description} />
                </div>

                {pile.cards.map((card, index) => (
                  <div key={index} className={cx('card-item')}>
                    {card.rank} {card.suit}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={cx('pile-list')}>
          {game.columnPiles.map((pile, index) => {
            return (
              <Pile
                key={index}
                accept={TYPE.CARD}
                onDrop={(item, monitor) => handleDrop(item, monitor, pile)}
                handleCanDrop={item => pile.canDrop(item.card)}
              >
                <div className={cx('card', 'card--slot')} />

                {pile.cards.map((card, index) => (
                  <Card key={index} type={TYPE.CARD} pile={pile} card={card} style={{ top: 25 * index }} canDrag={pile.canMove(card)} />
                ))}
              </Pile>
            )
          })}
        </div>
      </div>
    </DndProvider>
  )
}

Board.propTypes = propTypes

export default Board
