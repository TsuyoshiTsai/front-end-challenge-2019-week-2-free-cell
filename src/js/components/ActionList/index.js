import React from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Button from '../Button'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {}

function ActionList (props) {
  return (
    <div className={cx('action-list')}>
      <Button type='primary' shape='rounded' size='sm' width={120}>
        NEW GAME
      </Button>
      <Button type='primary' shape='rounded' size='sm' width={120}>
        RESTART
      </Button>
      <Button type='primary' shape='rounded' size='sm' width={120}>
        HINT
      </Button>
      <Button type='primary' shape='rounded' size='sm' width={120}>
        UNDO
      </Button>
    </div>
  )
}

ActionList.propTypes = propTypes

export default ActionList
