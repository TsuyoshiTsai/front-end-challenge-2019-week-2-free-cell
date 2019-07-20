import React from 'react'
import { hot } from 'react-hot-loader'
import { withRouter } from 'react-router-dom'
// import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

// Components
import ActionList from './js/components/ActionList'
import Content from './js/components/Content'
import Rule from './js/components/Rule'
import Status from './js/components/Status'

// Style
import styles from './style.module.scss'

// Variables / Functions
const cx = classnames.bind(styles)

export const propTypes = {}

function App (props) {
  return (
    <div className={cx('app')}>
      <main className={cx('app__main')}>
        <section className={cx('app__content')}>
          <Content />
        </section>
        <footer className={cx('app__footer')}>
          <Rule />
          <Status />

          <div className={cx('app__action-list-wrapper')}>
            <ActionList />
          </div>
        </footer>
      </main>
    </div>
  )
}

App.propTypes = propTypes

export default hot(module)(withRouter(App))
