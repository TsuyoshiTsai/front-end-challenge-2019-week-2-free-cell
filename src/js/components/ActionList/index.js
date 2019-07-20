import React from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {}

function ActionList (props) {
  return (
    <div className={cx('action-list')}>
      <button>NEW GAME</button>
      <button>RESTART</button>
      <button>HINT</button>
      <button>UNDO</button>
    </div>
  )
}

ActionList.propTypes = propTypes

export default ActionList
