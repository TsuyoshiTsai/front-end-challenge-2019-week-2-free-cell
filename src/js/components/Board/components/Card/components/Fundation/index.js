import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Card from '../Card'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {
  suit: PropTypes.symbol,
}

function Fundation (props) {
  const { suit } = props

  return (
    <Card className={cx('card-fundation')} elementType='div'>
      <img src={require(`../../../../../../../assets/images/cards/${suit.description}.png`)} alt={suit.description} />
    </Card>
  )
}

Fundation.propTypes = propTypes

export default Fundation
