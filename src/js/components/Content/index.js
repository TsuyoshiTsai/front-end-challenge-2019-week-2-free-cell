import React, { useRef, useCallback } from 'react'
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

  const onDragEnd = useCallback(({ destination, source }) => {
    //  draggableId: "club6",
    console.log('destination, source :', destination, source)
    // : {index: 6, droppableId: "37850e15-035f-45ab-aabd-b6a4a652bca1"}
    if (destination === null) return

    const [from] = gameRef.current.columnPiles.filter(pile => pile.id === source.droppableId)
    const [to] = gameRef.current.columnPiles.filter(pile => pile.id === destination.droppableId)
    const size = from.cards.length - source.index
    console.log('from.cards :', from.cards[source.index].color)

    gameRef.current.move(from, to, size)
  }, [])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
            <Droppable key={index} droppableId={columnPile.id} type='a'>
              {(provided, snapshot) => {
                // console.log('snapshot :', snapshot)
                return (
                  <div
                    ref={provided.innerRef}
                    className={cx('card-list')}
                    {...provided.droppableProps}
                    style={{
                      background: snapshot.isDraggingOver ? 'yellow' : Boolean(snapshot.draggingFromThisWith) && 'yellowgreen',
                    }}
                  >
                    <div className={cx('card-slot')}>{index}</div>

                    {columnPile.cards.map((card, index) => {
                      const rankWithSuit = `${card.suit.description}${card.rank}`
                      // console.log('provided.draggableProps :', provided)

                      return (
                        <Draggable
                          key={rankWithSuit}
                          draggableId={rankWithSuit}
                          index={index}
                          isDragDisabled={!card.isMovable}
                          type={snapshot.isDraggingOver ? 'b' : 'a'}
                        >
                          {(provided, snapshot) => {
                            // console.log('provided :', provided)
                            // console.log('snapshot :', snapshot)
                            return (
                              <img
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                className={cx('card-item')}
                                style={{ top: 25 * index, ...provided.draggableProps.style }}
                                src={require(`../../../assets/images/cards/${rankWithSuit}.png`)}
                                alt={rankWithSuit}
                              />
                            )
                          }}
                        </Draggable>
                      )
                    })}

                    {provided.placeholder}
                  </div>
                )
              }}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  )
}

Content.propTypes = propTypes

export default Content
