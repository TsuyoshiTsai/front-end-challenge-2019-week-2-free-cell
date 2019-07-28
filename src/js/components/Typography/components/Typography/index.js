import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components

// Lib MISC

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  element: PropTypes.string,
  isBlock: PropTypes.bool,
  shouldEllipsis: PropTypes.bool,
  color: PropTypes.oneOf([
    'inherit',
    'primary-light',
    'primary',
    'primary-dark',
    'white',
    'gray-lightest',
    'gray-lighter',
    'gray-light',
    'gray',
    'gray-dark',
    'gray-darker',
    'gray-darkest',
  ]),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around']),
  marginTop: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  marginBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fontWeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  letterSpacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  className: PropTypes.string,
}

export const defaultProps = {
  element: 'div',
  isBlock: false,
  color: 'inherit',
}

function Typography (props) {
  const {
    element,
    isBlock,
    shouldEllipsis,
    color,
    size,
    align,
    marginTop,
    marginBottom,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    style,
    className,
    ...restProps
  } = props

  return React.createElement(element, {
    'data-color': color,
    'data-size': size,
    'data-is-block': isBlock,
    'data-should-ellipsis': shouldEllipsis,
    style: { marginTop, marginBottom, fontSize, fontWeight, lineHeight, letterSpacing, justifyContent: align, ...style },
    className: cx('typography', className),
    ...restProps,
  })
}

Typography.propTypes = propTypes
Typography.defaultProps = defaultProps

export default Typography
