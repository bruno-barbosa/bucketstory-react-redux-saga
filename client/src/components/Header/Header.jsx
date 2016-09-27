import React, { PropTypes } from 'react'
import { IndexLink } from 'react-router'

import Drawer from './Drawer'
import Navigation from './Navigation'

import Auth from 'components/Auth'

import { Header } from 'react-mdl'

class HeaderComponent extends React.Component {
  static propTypes = {}

  constructor (props, context) {
    super(props, context)

    this.state = {
      booleans: {
        authBoolean: false
      }
    }

    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle (toggle) {
    this.setState({ booleans: { authBoolean: !this.state.booleans.authBoolean } })
    if (toggle === this.state.booleans.authBoolean) {
    }
  }

  render () {
    require('./header.scss')

    return (
      <div>
        <Header scroll className='header-navigation' title={
          <IndexLink to='/'>
            <img src='./images/logo.svg' alt='bucketstory' />
          </IndexLink>
        }>
          <Navigation
            handleToggle={this.handleToggle}
            />
        </Header>
        <Auth handleToggle={this.handleToggle} authBoolean={this.state.booleans.authBoolean} />
        <Drawer />
      </div>
    )
  }
}

export default HeaderComponent
