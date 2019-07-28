import React, { useState } from 'react'
import { format, toDate, subHours } from 'date-fns'
import classnames from 'classnames/bind'

// Lib MISC
import useInterval from '../../../../lib/effects/useInterval'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)
const initTimestamp = new Date().getTime()

function Clock (props) {
  const [timestamp, setTimestamp] = useState(initTimestamp)

  const millisecond = 1000
  useInterval(() => {
    setTimestamp(timestamp + millisecond)
  }, millisecond)

  return <div className={cx('status-clock')}>TIME: {format(subHours(toDate(timestamp - initTimestamp), 8), 'HH:mm:ss')}</div>
}

export default Clock
