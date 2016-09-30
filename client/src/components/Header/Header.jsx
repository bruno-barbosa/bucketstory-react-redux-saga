import React, { PropTypes } from 'react'
import { IndexLink } from 'react-router'

import Drawer from './Drawer'
import Navigation from './Navigation'

import Auth from 'components/Auth'

import { Header } from 'react-mdl'

class HeaderComponent extends React.Component {
  static propTypes = {
    actions : PropTypes.shape({
      auth : PropTypes.object.isRequired
    }),
    state : PropTypes.shape({
      account   : PropTypes.object.isRequired
    })
  }

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
        <Auth
          authBoolean={this.state.booleans.authBoolean}
          handleToggle={this.handleToggle}
          authActions={this.props.actions.auth}
        />
        <Drawer />
      </div>
    )
  }
}

export default HeaderComponent
