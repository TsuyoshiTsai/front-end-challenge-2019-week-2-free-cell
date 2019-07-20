import React from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {}

function Content (props) {
  return <div className={cx('content')}>Content</div>
}

Content.propTypes = propTypes

export default Content
