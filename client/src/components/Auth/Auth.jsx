import React, { PropTypes } from 'react'

import AuthDialog from './AuthDialog'
import LoginTab from './LoginTab'
import RegisterTab from './RegisterTab'

class Auth extends React.Component {
  static propTypes = {
    authBoolean  : PropTypes.bool.isRequired,
    handleToggle : PropTypes.func.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      activeTab : 0
    }

    this.handleTabChange = this.handleTabChange.bind(this)
    this.renderActiveTab = this.renderActiveTab.bind(this)
  }

  handleTabChange (tabId) {
    this.setState({ activeTab: tabId })
  }

  renderActiveTab () {
    switch (this.state.activeTab) {
      case 0: return <LoginTab />
      case 1: return <RegisterTab />
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
