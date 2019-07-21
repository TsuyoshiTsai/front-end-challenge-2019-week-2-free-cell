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
  const a = new Game()
  console.log('a :', a)

  return <div className={cx('content')}>Content</div>
}

Content.propTypes = propTypes

export default Content
