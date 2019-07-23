import React, { useRef } from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// Models
import { Game } from '../../lib/models'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {}

function Content (props) {
  const gameRef = useRef(new Game())
  console.log('gameRef :', gameRef)

  return (
    <DragDropContext
      onDragEnd={(...props) => {
        console.log(props)
      }}
    >
      <div className={cx('content')}>
        <div className={cx('stack-container')}>
          <div className={cx('pile-list')}>
            {gameRef.current.parkingPiles.map((parkingPile, index) => (
              <div key={index} className={cx('card-list')}>
                <div className={cx('card-slot')}>{index}</div>

                {parkingPile.cards.map((card, index) => (
                  <div key={index} className={cx('card-item')}>
                    {card.rank} {card.suit}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className={cx('king')}>king</div>

          <div className={cx('pile-list')}>
            {gameRef.current.fundationPiles.map((fundationPile, index) => (
              <div key={index} className={cx('card-list')}>
                <div className={cx('card-slot')}>{index}</div>

                {fundationPile.cards.map((card, index) => (
                  <div key={index} className={cx('card-item')}>
                    {card.rank} {card.suit}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={cx('pile-list')}>
          {gameRef.current.columnPiles.map((columnPile, index) => (
            <Droppable key={index} droppableId={columnPile.id}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} className={cx('card-list')} {...provided.droppableProps}>
                  <div className={cx('card-slot')}>{index}</div>

                  {columnPile.cards.map((card, index) => {
                    const uniqKey = `${card.suit.toString()}${card.rank}`

                    return (
                      <Draggable key={uniqKey} draggableId={uniqKey} index={index}>
                        {(provided, snapshot) => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className={cx('card-item')}
                            style={{ top: 25 * index, ...provided.draggableProps.style }}
                          >
                            {card.rank} {card.suit.toString()}
                          </div>
                        )}
                      </Draggable>
                    )
                  })}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  )
}

Content.propTypes = propTypes

export default Content
