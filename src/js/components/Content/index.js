import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// Components
import Brand from '../Brand'
import Typography from '../Typography'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  game: PropTypes.object,
  forceUpdate: PropTypes.func,
}

function Content (props) {
  const { game, forceUpdate } = props

  const onDragEnd = useCallback(
    ({ destination, source }) => {
      if (destination === null) return

      const [from] = game.columnPiles.filter(pile => pile.id === source.droppableId)
      const [to] = game.columnPiles.filter(pile => pile.id === destination.droppableId)
      const size = from.cards.length - source.index

      game.move(from, to, size)
      forceUpdate()
    },
    [forceUpdate, game]
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={cx('content')}>
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
          {game.columnPiles.map((pile, index) => (
            <Droppable key={index} droppableId={pile.id} type='a'>
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
                    <div className={cx('card', 'card--slot')} />

                    {pile.cards.map((card, index) => {
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
                                className={cx('card', 'card--suit')}
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
