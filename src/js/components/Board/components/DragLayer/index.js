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

const getTransform = currentOffset => `translate(${currentOffset.x}px, ${currentOffset.y}px)`
const getItemStyles = (currentOffset, index) => ({
  transform: getTransform(currentOffset),
  top: 25 * index,
})
const getHintStyles = (currentOffset, size) => ({
  transform: getTransform(currentOffset),
  paddingBottom: (size - 1) * 25,
})

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
        const afterCards = item.from.getAfterCards(item.card)

        return (
          <>
            {afterCards.map((card, index) => (
              <Card.Suit key={index} card={card} style={getItemStyles(currentOffset, index)} />
            ))}

            <Card.Hint style={getHintStyles(currentOffset, afterCards.length)} />
          </>
        )

      // __NATIVE_FILE__
      default:
        return null
    }
  }

  return isDragging && initialOffset && currentOffset ? <div className={cx('drag-layer')}>{renderItem()}</div> : null
}

export default DragLayer
