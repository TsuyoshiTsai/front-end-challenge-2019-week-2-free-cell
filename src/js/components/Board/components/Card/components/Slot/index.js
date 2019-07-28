import React from 'react'
import classnames from 'classnames/bind'

// Components
import Card from '../Card'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

function Slot (props) {
  return <Card className={cx('card-slot')} elementType='div' />
}

export default Slot
