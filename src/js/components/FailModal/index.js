import React from 'react'
import PropTypes from 'prop-types'

// Components
import Modal from '../Modal'
import Brand from '../Brand'
import Button from '../Button'
import Typography from '../Typography'

export const propTypes = {
  onGiveUp: PropTypes.func,
  onRestart: PropTypes.func,
  onUndo: PropTypes.func,
}

function FailModal (props) {
  const { onGiveUp, onRestart, onUndo, ...restProps } = props

  return (
    <Modal {...restProps}>
      <Modal.Header>
        <Brand.Image type='sad' />
        <Typography.Text size='xl' align='center' lineHeight={1.25} marginTop={15} isBlock>
          NO MORE MOVES
        </Typography.Text>
      </Modal.Header>
      <Modal.Body>
        <Typography.Text letterSpacing='0.05em'>There are no moves available.</Typography.Text>
      </Modal.Body>
      <Modal.Footer>
        <Button type='primary' size='sm' shape='rounded' width={150} onClick={onRestart}>
          RESTART
        </Button>
        <Button type='primary' size='sm' shape='rounded' width={150} onClick={onGiveUp}>
          NEW GAME
        </Button>
        <Button type='primary' size='sm' shape='rounded' width={150} onClick={onUndo}>
          UNDO
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

FailModal.propTypes = propTypes

export default FailModal
