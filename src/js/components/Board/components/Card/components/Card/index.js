import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  elementType: PropTypes.elementType,
  className: PropTypes.string,
  forwardRef: PropTypes.any,
}

function Card (props) {
  const { elementType, className, forwardRef, ...restProps } = props

  return React.createElement(elementType, {
    ref: forwardRef,
    className: cx('card', className),
    ...restProps,
  })
}

Card.propTypes = propTypes

export default React.forwardRef((props, ref) => <Card forwardRef={ref} {...props} />)
