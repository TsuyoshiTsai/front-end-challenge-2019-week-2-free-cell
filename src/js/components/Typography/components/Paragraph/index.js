import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Typography from '../Typography'

// Lib MISC

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
}

export const defaultProps = {}

function Paragraph (props) {
  const { className, ...restProps } = props

  return <Typography element='p' className={cx('typography-paragraph', className)} {...restProps} />
}

Paragraph.propTypes = propTypes
Paragraph.defaultProps = defaultProps

export default Paragraph
