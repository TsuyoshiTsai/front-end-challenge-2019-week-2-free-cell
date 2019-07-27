import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Card from '../Card'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  card: PropTypes.shape({
    imagePath: PropTypes.string,
  }),
  style: PropTypes.object,
  className: PropTypes.string,
  forwardRef: PropTypes.any,
}

function Suit (props) {
  const { card, style, className, forwardRef, ...restProps } = props

  return (
    <Card
      elementType='img'
      src={require(`../../../../../../../assets/images/cards/${card.imagePath}.png`)}
      alt={card.imagePath}
      style={style}
      className={cx('card-suit', className)}
      ref={forwardRef}
      {...restProps}
    />
  )
}

Suit.propTypes = propTypes

export default React.forwardRef((props, ref) => <Suit forwardRef={ref} {...props} />)
