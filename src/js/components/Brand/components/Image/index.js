import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  type: PropTypes.oneOf(['angry', 'happy', 'joy', 'sad']),
  className: PropTypes.string,
}

function Image (props) {
  const { type, className, ...restProps } = props

  return <img className={cx('brand-image')} src={require(`../../../../../assets/images/king/${type}.png`)} alt={`FREECELL-${type}`} {...restProps} />
}

Image.propTypes = propTypes

export default Image
