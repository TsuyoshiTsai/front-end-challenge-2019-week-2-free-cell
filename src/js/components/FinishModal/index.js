import React from 'react'
import PropTypes from 'prop-types'

// Components
import Modal from '../Modal'
import Brand from '../Brand'
import Button from '../Button'
import Typography from '../Typography'

export const propTypes = {
  onGiveUp: PropTypes.func,
}

function FinishModal (props) {
  const { onGiveUp, ...restProps } = props

  return (
    <Modal {...restProps}>
      <Modal.Header>
        <Brand.Image type='angry' />
        <Typography.Text size='xl' align='center' lineHeight={1.25} marginTop={15} isBlock>
          CONGRATULATIONS
        </Typography.Text>
      </Modal.Header>
      <Modal.Body>
        <Typography.Text letterSpacing='0.05em'>Are you sure you want to give up?</Typography.Text>
      </Modal.Body>
      <Modal.Footer>
        <Button type='primary' size='sm' shape='rounded' width={150} onClick={onGiveUp}>
          NEW GAME
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

FinishModal.propTypes = propTypes

export default FinishModal
