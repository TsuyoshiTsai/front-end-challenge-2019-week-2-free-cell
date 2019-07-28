import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Clock from './components/Clock'
import Score from './components/Score'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  score: PropTypes.number,
}

function Status (props) {
  const { score } = props

  return (
    <div className={cx('status')}>
      <Clock />
      <Score>{score}</Score>
    </div>
  )
}

Status.propTypes = propTypes

export default Status
