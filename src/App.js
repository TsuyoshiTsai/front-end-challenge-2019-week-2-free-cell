import React, { useState, useEffect } from 'react'
import { hot } from 'react-hot-loader'
import { withRouter } from 'react-router-dom'
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

function App (props) {
  const [isGiveUpModalOpened, setIsGiveUpModalOpened] = useState(false)
  const [isFailModalOpened, setIsFailModalOpened] = useState(false)
  const [isFinishModalOpened, setIsFinishModalOpened] = useState(false)
  const [hint, setHint] = useState(null)
  const [game, setGame] = useState(new Game().data)

  const openGiveUpModal = () => setIsGiveUpModalOpened(true)
  const closeGiveUpModal = () => setIsGiveUpModalOpened(false)
  const openFailModal = () => setIsFailModalOpened(true)
  const closeFailModal = () => setIsFailModalOpened(false)
  const openFinishModal = () => setIsFinishModalOpened(true)
  const closeFinishModal = () => setIsFinishModalOpened(false)

  const handleGiveUp = () => setGame(new Game().data)
  const handleHint = () => setHint(game.getHint())
  const handleRestart = () => setGame({ ...game.reset() })
  const handleUndo = () => setGame({ ...game.undo() })

  const onCardsMove = (from, to, size) => {
    setGame({ ...game.move(from, to, size) })
    setHint(null)
  }

  const isFinish = game.isFinish()
  const canMove = game.canMove()
  const isFail = !isFinish && !canMove

  useEffect(() => {
    if (isFail) {
      openFailModal()
    }
  }, [isFail])

  useEffect(() => {
    if (isFinish) {
      openFinishModal()
    }
  }, [isFinish])

  return (
    <div className={cx('app')}>
      <GiveUpModal
        isOpened={isGiveUpModalOpened}
        onClose={closeGiveUpModal}
        onGiveUp={event => {
          closeGiveUpModal()
          handleGiveUp()
        }}
      />
      <FailModal
        isOpened={isFailModalOpened}
        onClose={closeFailModal}
        onGiveUp={event => {
          closeFailModal()
          handleGiveUp()
        }}
        onRestart={event => {
          closeFailModal()
          handleRestart()
        }}
        onUndo={event => {
          closeFailModal()
          handleUndo()
        }}
      />
      <FinishModal
        isOpened={isFinishModalOpened}
        onClose={event => setIsFinishModalOpened(false)}
        onGiveUp={event => {
          closeFinishModal()
          handleGiveUp()
        }}
        onRestart={event => {
          closeFinishModal()
          handleRestart()
        }}
      />

      <main className={cx('app__main')}>
        <section className={cx('app__content')}>
          <Board game={game} hint={hint} onCardsMove={onCardsMove} />
        </section>
        <footer className={cx('app__footer')}>
          <Rule />
          <Status score={game.score} />

          <div className={cx('app__action-list')}>
            <Button type='primary' shape='rounded' size='sm' width={120} onClick={openGiveUpModal}>
              NEW GAME
            </Button>
            <Button type='primary' shape='rounded' size='sm' width={120} onClick={handleRestart} disabled={!game.canReset()}>
              RESTART
            </Button>
            <Button type='primary' shape='rounded' size='sm' width={120} onClick={handleHint}>
              HINT
            </Button>
            <Button type='primary' shape='rounded' size='sm' width={120} onClick={handleUndo} disabled={!game.canUndo()}>
              UNDO
            </Button>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default hot(module)(withRouter(App))
