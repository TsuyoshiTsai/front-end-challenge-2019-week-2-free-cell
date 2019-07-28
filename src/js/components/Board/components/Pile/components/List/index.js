import React from 'react'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

function List (props) {
  return <div className={cx('pile-list')} {...props} />
}

export default List
