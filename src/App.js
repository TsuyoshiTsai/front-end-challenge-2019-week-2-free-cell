import React from 'react'
import { hot } from 'react-hot-loader'
import { withRouter } from 'react-router-dom'
// import PropTypes from 'prop-types'
// import classnames from 'classnames/bind'

// Style
// import styles from './style.module.scss'

export const propTypes = {}

function App (props) {
  return <div>app</div>
}

App.propTypes = propTypes

export default hot(module)(withRouter(App))
