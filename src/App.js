import React from 'react'
import { hot } from 'react-hot-loader'
import { withRouter } from 'react-router-dom'
// import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {}

function App (props) {
  return <div className={cx('app')}>app</div>
}

App.propTypes = propTypes

export default hot(module)(withRouter(App))
