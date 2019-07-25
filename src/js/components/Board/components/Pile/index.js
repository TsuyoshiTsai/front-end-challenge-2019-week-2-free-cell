import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import { useDrop } from 'react-dnd'

// Components

// Lib MISC
// import { TYPE } from '../../constants'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  accept: PropTypes.string,
  onDrop: PropTypes.func,
  handleCanDrop: PropTypes.func,
  children: PropTypes.node,
}

function Pile (props) {
  const { accept, onDrop, handleCanDrop, children } = props

  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: handleCanDrop,
  })

  const isActive = isOver && canDrop

  let backgroundColor = 'transparent'
  if (isActive) {
    backgroundColor = 'yellowgreen'
  } else if (canDrop) {
    backgroundColor = 'darkgreen'
  }

  return (
    <div ref={drop} className={cx('pile')} style={{ backgroundColor }}>
      {children}
    </div>
  )
}

Pile.propTypes = propTypes

export default Pile
