import React from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

import { Game } from '../../lib/models'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {}

function Content (props) {
  const game = new Game()

  return (
    <div className={cx('content')}>
      <div className={cx('stack-container')}>
        <div className={cx('pile-list')}>
          {game.parkingPiles.map((parkingPile, index) => (
            <div key={index} className={cx('pile-item')}>
              <div className={cx('slot')}>{index}</div>

              {parkingPile.cards.map((card, index) => (
                <div key={index} className={cx('card')}>
                  {card.rank} {card.suit}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={cx('king')}>king</div>

        <div className={cx('pile-list')}>
          {game.fundationPiles.map((fundationPile, index) => (
            <div key={index} className={cx('pile-item')}>
              <div className={cx('slot')}>{index}</div>

              {fundationPile.cards.map((card, index) => (
                <div key={index} className={cx('card')}>
                  {card.rank} {card.suit}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={cx('pile-list')}>
        {game.columnPiles.map((columnPile, index) => (
          <div key={index} className={cx('pile-item')}>
            <div className={cx('slot')}>{index}</div>

            {columnPile.cards.map((card, index) => (
              <div key={index} className={cx('card')} style={{ top: index * 50 }}>
                {card.rank} {card.suit}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

Content.propTypes = propTypes

export default Content
