import React, { useState, useEffect } from 'react'
import { hot } from 'react-hot-loader'
import { withRouter } from 'react-router-dom'
// import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import FailModal from './js/components/FailModal'
import FinishModal from './js/components/FinishModal'
import GiveUpModal from './js/components/GiveUpModal'
import Button from './js/components/Button'
import Board from './js/components/Board'
import Rule from './js/components/Rule'
import Status from './js/components/Status'

// Models
import { Game } from './js/lib/models/game.model'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {}

function App (props) {
  const [isGiveUpModalOpened, setIsGiveUpModalOpened] = useState(false)
  const [isFailModalOpened, setIsFailModalOpened] = useState(false)
  const [isFinishModalOpened, setIsFinishModalOpened] = useState(false)
  const [hint, setHint] = useState(null)
  const [game, setGame] = useState(new Game().data)
  console.log('game :', game)
  console.log('game.canMove :', game.canMove())
  const isFinish = game.isFinish()
  const canMove = game.canMove()
  const isFail = !isFinish && !canMove

  useEffect(() => {
    if (isFail) {
      setIsFailModalOpened(true)
    }
  }, [isFail])

  useEffect(() => {
    if (isFinish) {
      setIsFinishModalOpened(true)
    }
  }, [isFinish])

  const onCardsMove = (from, to, size) => {
    setGame({ ...game.move(from, to, size) })
    setHint(null)
  }
  const onGiveUp = event => {
    setIsGiveUpModalOpened(false)
    setGame(new Game().data)
  }
  const onHint = event => setHint(game.getHint())
  const onRestart = event => setGame({ ...game.reset() })
  const onUndo = event => setGame({ ...game.undo() })

  return (
    <div className={cx('app')}>
      <GiveUpModal isOpened={isGiveUpModalOpened} onClose={event => setIsGiveUpModalOpened(false)} onGiveUp={onGiveUp} />
      <FailModal
        isOpened={isFailModalOpened}
        onClose={event => setIsFailModalOpened(false)}
        onGiveUp={onGiveUp}
        onRestart={onRestart}
        onUndo={onUndo}
      />
      <FinishModal isOpened={isFinishModalOpened} onClose={event => setIsFinishModalOpened(false)} onGiveUp={onGiveUp} />

      <main className={cx('app__main')}>
        <section className={cx('app__content')}>
          <Board game={game} hint={hint} onCardsMove={onCardsMove} />
        </section>
        <footer className={cx('app__footer')}>
          <Rule />
          <Status />

          <div className={cx('app__action-list')}>
            <Button type='primary' shape='rounded' size='sm' width={120} onClick={event => setIsGiveUpModalOpened(true)}>
              NEW GAME
            </Button>
            <Button type='primary' shape='rounded' size='sm' width={120} onClick={onRestart} disabled={!game.canReset()}>
              RESTART
            </Button>
            <Button type='primary' shape='rounded' size='sm' width={120} onClick={onHint}>
              HINT
            </Button>
            <Button type='primary' shape='rounded' size='sm' width={120} onClick={onUndo} disabled={!game.canUndo()}>
              UNDO
            </Button>
          </div>
        </footer>
      </main>
    </div>
  )
}

App.propTypes = propTypes

export default hot(module)(withRouter(App))
