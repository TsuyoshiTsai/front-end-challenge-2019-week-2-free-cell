import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Brand from '../Brand'
import Typography from '../Typography'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  game: PropTypes.object,
  // setGame: PropTypes.func,
}

function Content (props) {
  const { game } = props

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

  return (
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
        {game.columnPiles.map((pile, index) => {
          return (
            <div key={index} className={cx('card-list')}>
              <div className={cx('card', 'card--slot')} />

              {pile.cards.map((card, index) => {
                const rankWithSuit = `${card.suit.description}${card.rank}`
                // console.log('provided.draggableProps :', provided)

                return (
                  <img
                    key={index}
                    className={cx('card', 'card--suit')}
                    style={{ top: 25 * index }}
                    src={require(`../../../assets/images/cards/${rankWithSuit}.png`)}
                    alt={rankWithSuit}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

Content.propTypes = propTypes

export default Content
