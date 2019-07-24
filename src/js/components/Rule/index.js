import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import Button from '../Button'
import Brand from '../Brand'
import Modal from '../Modal'
import Svg from '../Svg'
import Typography from '../Typography'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)
const SPADE_SVG_DATA =
  'M16.9439803,8.901 C17.6155743,9.55274365 17.998172,10.4745856 17.998172,11.441 C17.998172,12.4074144 17.6155743,13.3292563 16.9439803,13.981 C15.4936026,15.3774479 13.2828631,15.3774479 11.8324854,13.981 L9.999086,12.159 L8.1656866,13.981 C6.7153089,15.3774479 4.50456938,15.3774479 3.05419167,13.981 C2.38259767,13.3292563 2,12.4074144 2,11.441 C2,10.4745856 2.38259767,9.55274365 3.05419167,8.901 L4.8866499,7.079 L5.61040972,6.361 L9.999086,2 L14.3877623,6.361 L15.1105809,7.079 L16.9439803,8.901 Z M7.17557564,17.999 L9.999086,12.999 L12.8225964,17.999 L7.17557564,17.999 Z'

export const propTypes = {}

function Rule (props) {
  const [isModalOpened, setIsModalOpened] = useState(false)

  return (
    <div className={cx('rule')}>
      <Modal isOpened={isModalOpened} onClose={event => setIsModalOpened(false)}>
        <Modal.Header>
          <Brand.Image type='happy' />
          <Typography.Text size='xl' align='center' lineHeight={1.25} marginTop={15} isBlock>
            FREECELL RULE
          </Typography.Text>
        </Modal.Header>
        <Modal.Body>
          <Typography.Paragraph lineHeight={1.75} letterSpacing='0.05em'>
            The object of the game is to build up all cards on foundations from Ace to King by following suit. You win when all 52 cards are moved
            there, 13 to a pile.
            <br />
            <br />
            Top cards of tableau piles and cards from Cells are available to play. You can build tableau piles down by alternating color. Only one
            card at a time can be moved. The top card of any tableau pile can also be moved to any Cell. Each Cell (or Reserve space) may contain only
            one card. Cards in the cells can be moved to the foundation piles or back to the tableau piles, if possible.
            <br />
            <br />
            The rules state that you can move only one card at a time, but you can move group of cards in the proper sequence if you have enough free
            (empty) Cells and/or tableau piles.
          </Typography.Paragraph>
        </Modal.Body>
      </Modal>

      <Button type='primary' size='sm' shape='circle' isFilled={false} onClick={event => setIsModalOpened(true)}>
        <Svg size={20} data={SPADE_SVG_DATA} />
      </Button>
    </div>
  )
}

Rule.propTypes = propTypes

export default Rule
