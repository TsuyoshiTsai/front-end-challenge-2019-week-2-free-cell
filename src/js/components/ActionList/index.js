import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Button from '../Button'
import GiveUpModal from './components/GiveUpModal'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  onGiveUp: PropTypes.func,
  onRestart: PropTypes.func,
  onHint: PropTypes.func,
  onUndo: PropTypes.func,
}

function ActionList (props) {
  const { onGiveUp, onRestart, onHint, onUndo } = props

  const [isGiveUpModalOpened, setIsGiveUpModalOpened] = useState(false)

  return (
    <div className={cx('action-list')}>
      <GiveUpModal isOpened={isGiveUpModalOpened} onClose={event => setIsGiveUpModalOpened(false)} onGiveUp={onGiveUp} />

      <Button type='primary' shape='rounded' size='sm' width={120} onClick={event => setIsGiveUpModalOpened(true)}>
        NEW GAME
      </Button>
      <Button type='primary' shape='rounded' size='sm' width={120} onClick={onRestart}>
        RESTART
      </Button>
      <Button type='primary' shape='rounded' size='sm' width={120} onClick={onHint}>
        HINT
      </Button>
      <Button type='primary' shape='rounded' size='sm' width={120} onClick={onUndo}>
        UNDO
      </Button>
    </div>
  )
}

ActionList.propTypes = propTypes

export default ActionList
