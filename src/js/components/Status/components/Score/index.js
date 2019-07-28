import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  children: PropTypes.any,
}

function Score (props) {
  const { children } = props

  return <div className={cx('status-score')}>SCORE: {children}</div>
}

Score.propTypes = propTypes

export default Score
