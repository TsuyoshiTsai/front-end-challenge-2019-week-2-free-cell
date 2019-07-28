import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  forwardRef: PropTypes.any,
}

function Pile (props) {
  const { forwardRef, ...restProps } = props

  return <div ref={forwardRef} className={cx('pile')} {...restProps} />
}

Pile.propTypes = propTypes

export default React.forwardRef((props, ref) => <Pile forwardRef={ref} {...props} />)
