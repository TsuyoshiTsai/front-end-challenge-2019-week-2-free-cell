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
  // const a = new Card({ number: 1, suit: CardSuit.heart })
  const game = new Game()

  return (
    <div className={cx('content')}>
      <div className={cx('stack-container')}>
        {new Array(4).fill(0).map((empty, index) => (
          <div key={index} className={cx('parking')}>
            {index}
          </div>
        ))}

        <div>king</div>

        {new Array(4).fill(0).map((empty, index) => (
          <div key={index} className={cx('fundation')}>
            {index}
          </div>
        ))}
      </div>

      <div className={cx('pile-list')}>
        {game.piles.map((pile, index) => (
          <div key={index} className={cx('pile-item')}>
            <div className={cx('parking')}>parking</div>
            {pile.cards.map((card, index) => (
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
