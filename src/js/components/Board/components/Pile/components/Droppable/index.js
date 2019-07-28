import React from 'react'
import PropTypes from 'prop-types'
import { useDrop } from 'react-dnd'

// Components
import Pile from '../Pile'

export const propTypes = {
  accept: PropTypes.string,
  onDrop: PropTypes.func,
  handleCanDrop: PropTypes.func,
  children: PropTypes.node,
}

function Droppable (props) {
  const { accept, onDrop, handleCanDrop, children } = props

  const [, drop] = useDrop({
    accept,
    drop: onDrop,
    canDrop: handleCanDrop,
  })

  return <Pile ref={drop}>{children}</Pile>
}

Droppable.propTypes = propTypes

export default Droppable
