import React, { PropTypes } from 'react'

import AuthDialog from './AuthDialog'
import AuthTab from './AuthTab'

const LoginTab = AuthTab
const RegisterTab = AuthTab

class Auth extends React.Component {
  static propTypes = {
    authDialog      : PropTypes.bool.isRequired,
    handleToggle    : PropTypes.func.isRequired,
    authActions     : PropTypes.object.isRequired,
    userAccount     : PropTypes.object.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      activeTab : 0
    }

    this.handleAuth = this.handleAuth.bind(this)
    this.handleSocialAuth = this.handleSocialAuth.bind(this)

    this.handleTabChange = this.handleTabChange.bind(this)
    this.renderActiveTab = this.renderActiveTab.bind(this)
  }

  handleAuth (authData) {
    (!authData.name)
    ? this.props.authActions.loginRequest(authData)
    : this.props.authActions.registerRequest(authData)
  }

  handleSocialAuth (provider) {
    this.props.authActions.socialAuth(provider)
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
          userAccount={this.props.userAccount}
          handleAuth={this.handleAuth}
        />
      )
      case 1: return (
        <RegisterTab
          authText='Sign up'
          authType='register'
          userAccount={this.props.userAccount}
          handleAuth={this.handleAuth}
        />
      )
      default: return null
    }
  }

  render () {
    return (
      <AuthDialog
        authDialog={this.props.authDialog}
        handleToggle={this.props.handleToggle}
        handleTabChange={this.handleTabChange}
        renderActiveTab={this.renderActiveTab}
        {...this.state}
      />
    )
  }
}

export default Auth
