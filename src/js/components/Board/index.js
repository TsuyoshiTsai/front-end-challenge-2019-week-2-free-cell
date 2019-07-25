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

  const handleDrop = ({ card, from }, monitor, to) => setGame({ ...game.move(from, to, from.cards.length - from.cards.indexOf(card)) })
  const handleCanDrop = ({ card, from }, to) => to.canDrop(from.cards.slice(from.cards.indexOf(card)))

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={cx('board')}>
        <div className={cx('stack-container')}>
          <div className={cx('pile-list')}>
            {game.parkingPiles.map((pile, index) => {
              return (
                <Pile
                  key={index}
                  accept={TYPE.CARD}
                  onDrop={(item, monitor) => handleDrop(item, monitor, pile)}
                  handleCanDrop={item => handleCanDrop(item, pile)}
                >
                  <Card.Slot />

                  {pile.cards.map((card, index) => (
                    <Card.Suit key={index} type={TYPE.CARD} pile={pile} card={card} canDrag={pile.canMove(card)} />
                  ))}
                </Pile>
              )
            })}
          </div>

          <Brand>
            <Brand.Image type='happy' />
            <Typography.Text size='sm' fontWeight={700} marginTop={3}>
              FREECELL
            </Typography.Text>
          </Brand>

          <div className={cx('pile-list')}>
            {game.fundationPiles.map((pile, index) => {
              return (
                <Pile
                  key={index}
                  accept={TYPE.CARD}
                  onDrop={(item, monitor) => handleDrop(item, monitor, pile)}
                  handleCanDrop={item => handleCanDrop(item, pile)}
                >
                  <Card.Fundation suit={pile.suit} />

                  {pile.cards.map((card, index) => (
                    <Card.Suit key={index} type={TYPE.CARD} pile={pile} card={card} canDrag={pile.canMove(card)} />
                  ))}
                </Pile>
              )
            })}
          </div>
        </div>

        <div className={cx('pile-list')}>
          {game.columnPiles.map((pile, index) => {
            return (
              <Pile
                key={index}
                accept={TYPE.CARD}
                onDrop={(item, monitor) => handleDrop(item, monitor, pile)}
                handleCanDrop={item => handleCanDrop(item, pile)}
              >
                <Card.Slot />

                {pile.cards.map((card, index) => (
                  <Card.Suit key={index} type={TYPE.CARD} pile={pile} card={card} style={{ top: 25 * index }} canDrag={pile.canMove(card)} />
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
