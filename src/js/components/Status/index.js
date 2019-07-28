import React from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Clock from './components/Clock'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {}

function Status (props) {
  return (
    <div className={cx('status')}>
      <Clock />
    </div>
  )
}

Status.propTypes = propTypes

export default Status
