import React, { PropTypes } from 'react'

import AuthDialog from './AuthDialog'
import AuthTab from './AuthTab'

const LoginTab = AuthTab
const RegisterTab = AuthTab

class Auth extends React.Component {
  static propTypes = {
    authBoolean     : PropTypes.bool.isRequired,
    handleToggle    : PropTypes.func.isRequired,
    authActions     : PropTypes.object.isRequired,
    account         : PropTypes.object.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      activeTab : 0
    }

    this.handleAuth = this.handleAuth.bind(this)

    this.handleTabChange = this.handleTabChange.bind(this)
    this.renderActiveTab = this.renderActiveTab.bind(this)
  }

  handleAuth (authData) {
    (authData.type === 'login')
    ? this.props.authActions.loginRequest(authData)
    : this.props.authActions.registerRequest(authData)
  }

  handleTabChange (tabId) {
    this.setState({ activeTab: tabId })
  }

  renderActiveTab () {
    switch (this.state.activeTab) {
      case 0: return (
        <LoginTab
          authText='Sign in'
          authType='login'
          user={this.props.account}
          handleAuth={this.handleAuth}
        />
      )
      case 1: return (
        <RegisterTab
          authText='Sign up'
          authType='register'
          user={this.props.account}
          handleAuth={this.handleAuth}
        />
      )
      default: return null
    }
  }

  render () {
    return (
      <AuthDialog
        authBoolean={this.props.authBoolean}
        handleToggle={this.props.handleToggle}
        handleTabChange={this.handleTabChange}
        renderActiveTab={this.renderActiveTab}
        {...this.state}
      />
    )
  }
}

export default Auth
