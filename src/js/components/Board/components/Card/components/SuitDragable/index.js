import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

// Components
import Suit from '../Suit'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  type: PropTypes.string,
  pile: PropTypes.object,
  card: PropTypes.object,
  canDrag: PropTypes.bool,
  style: PropTypes.object,
}

function SuitDraggable (props) {
  const { type, pile, card, canDrag, style } = props

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type, from: pile, card },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: monitor => canDrag,
  })

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview])

  return (
    <Suit
      className={cx('card-suit-draggable')}
      ref={drag}
      card={card}
      style={{ ...style, cursor: canDrag ? 'pointer' : 'default', background: canDrag ? 'pink' : 'yellowgreen', opacity: isDragging ? 0 : null }}
      data-is-dragging={isDragging}
    />
  )
}

SuitDraggable.propTypes = propTypes

export default SuitDraggable
