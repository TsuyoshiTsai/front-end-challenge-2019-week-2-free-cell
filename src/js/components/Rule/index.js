import React from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {}

function Rule (props) {
  return <div className={cx('rule')}>rule</div>
}

Rule.propTypes = propTypes

export default Rule
