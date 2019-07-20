import React from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {}

function Status (props) {
  return <div className={cx('status')}>status</div>
}

Status.propTypes = propTypes

export default Status
