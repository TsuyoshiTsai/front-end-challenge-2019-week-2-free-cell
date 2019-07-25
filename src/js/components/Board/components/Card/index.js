import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { useDrag } from 'react-dnd'

// Components

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  type: PropTypes.string,
  pile: PropTypes.shape({
    id: PropTypes.string,
    cards: PropTypes.array,
  }),
  card: PropTypes.shape({
    rank: PropTypes.number,
    suit: PropTypes.symbol,
  }),
  canDrag: PropTypes.bool,
  style: PropTypes.object,
}

function Card (props) {
  const { type, pile, card, canDrag, style } = props

  const rankWithSuit = `${card.suit.description}${card.rank}`

  const [{ opacity }, drag] = useDrag({
    item: { type, from: pile, card },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
    canDrag: monitor => canDrag,
  })

  return (
    <img
      ref={drag}
      className={cx('card')}
      src={require(`../../../../../assets/images/cards/${rankWithSuit}.png`)}
      alt={rankWithSuit}
      style={{ ...style, cursor: canDrag ? 'pointer' : 'default', background: canDrag ? 'pink' : 'yellowgreen', opacity }}
    />
  )
}

Card.propTypes = propTypes

export default Card
