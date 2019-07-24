import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Image from './components/Image'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  className: PropTypes.string,
}

function Brand (props) {
  const { className, ...restProps } = props

  return <div className={cx('brand', className)} {...restProps} />
}

Brand.propTypes = propTypes

Brand.Image = Image

export default Brand
