import React from 'react'
import { useDragLayer } from 'react-dnd'
import classnames from 'classnames/bind'

// Components
import Card from '../Card'

// Style
import styles from './style.module.scss'

// Variables / Functions
import { TYPE } from '../../constants'
const cx = classnames.bind(styles)

function getItemStyles (index, initialOffset, currentOffset) {
  if (!initialOffset || !currentOffset) {
    return { display: 'none' }
  }

  return {
    transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
    top: 25 * index,
    border: `2px solid red`,
  }
}

function DragLayer (props) {
  const { item, itemType, isDragging, initialOffset, currentOffset } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }))

  const renderItem = () => {
    switch (itemType) {
      case TYPE.CARD:
        return item.from
          .getAfterCards(item.card)
          .map((card, index) => <Card.Suit key={index} card={card} style={getItemStyles(index, initialOffset, currentOffset)} />)

      // __NATIVE_FILE__
      default:
        return null
    }
  }

  return isDragging ? <div className={cx('drag-layer')}>{renderItem()}</div> : null
}

export default DragLayer
