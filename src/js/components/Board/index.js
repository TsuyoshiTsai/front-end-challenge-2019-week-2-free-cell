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
import DragLayer from './components/DragLayer'

// Lib MISC
import { TYPE } from './constants'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  game: PropTypes.object,
  hint: PropTypes.object,
  onCardsMove: PropTypes.func,
}

function Board (props) {
  const { game, hint, onCardsMove } = props

  const handleDrop = ({ card, from }, monitor, to) => onCardsMove(from, to, from.getAfterCards(card).length)
  const handleCanDrop = ({ card, from }, to) => to.canDrop(from.getAfterCards(card))
  const renderHint = (pile, shouldTranslate) => {
    if (!hint) return null

    const isFrom = hint.from.id === pile.id
    const isTo = hint.to.id === pile.id
    if (!isFrom && !isTo) return null

    const styles = {}
    if (shouldTranslate) {
      const distance = 25

      styles.top = Math.max(pile.cards.length - (isFrom ? hint.size : isTo && 1), 0) * distance
      styles.paddingBottom = (isFrom ? hint.size - 1 : isTo && 0) * distance
    }

    return <Card.Hint style={styles} />
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <DragLayer />

      <div className={cx('board')}>
        <div className={cx('board__stack-container')}>
          <Pile.List>
            {game.parkingPiles.map((pile, index) => (
              <Pile.Droppable
                key={index}
                accept={TYPE.CARD}
                onDrop={(item, monitor) => handleDrop(item, monitor, pile)}
                handleCanDrop={item => handleCanDrop(item, pile)}
              >
                <Card.Slot />

                {pile.cards.map((card, index) => (
                  <Card.SuitDragable key={index} type={TYPE.CARD} pile={pile} card={card} canDrag={pile.canMove(card)} />
                ))}

                {renderHint(pile, false)}
              </Pile.Droppable>
            ))}
          </Pile.List>

          <Brand>
            <Brand.Image type='happy' />
            <Typography.Text size='sm' fontWeight={700} marginTop={3}>
              FREECELL
            </Typography.Text>
          </Brand>

          <Pile.List>
            {game.fundationPiles.map((pile, index) => (
              <Pile.Droppable
                key={index}
                accept={TYPE.CARD}
                onDrop={(item, monitor) => handleDrop(item, monitor, pile)}
                handleCanDrop={item => handleCanDrop(item, pile)}
              >
                <Card.Fundation suit={pile.suit} />

                {pile.cards.map((card, index) => (
                  <Card.SuitDragable key={index} type={TYPE.CARD} pile={pile} card={card} canDrag={pile.canMove(card)} />
                ))}

                {renderHint(pile, false)}
              </Pile.Droppable>
            ))}
          </Pile.List>
        </div>

        <Pile.List>
          {game.columnPiles.map((pile, index) => (
            <Pile.Droppable
              key={index}
              accept={TYPE.CARD}
              onDrop={(item, monitor) => handleDrop(item, monitor, pile)}
              handleCanDrop={item => handleCanDrop(item, pile)}
            >
              <Card.Slot />

              {pile.cards.map((card, index) => (
                <Card.SuitDragable key={index} type={TYPE.CARD} pile={pile} card={card} style={{ top: 25 * index }} canDrag={pile.canMove(card)} />
              ))}

              {renderHint(pile, true)}
            </Pile.Droppable>
          ))}
        </Pile.List>
      </div>
    </DndProvider>
  )
}

Board.propTypes = propTypes

export default Board
