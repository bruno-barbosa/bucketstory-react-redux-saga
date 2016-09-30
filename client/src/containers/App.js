import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { authActions } from 'redux/actions'

import App from 'components/App'

class AppContainer extends React.Component {
  static propTypes = {
    children  : PropTypes.element.isRequired
  }

  render () {
    return (
      <App children={this.props.children} {...this.props} />
    )
  }
}

function mapStateToProps (state) {
  return {
    state: {
      account   : state.account
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions : {
      auth  : bindActionCreators(authActions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
