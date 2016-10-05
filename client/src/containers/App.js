import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { authActions, uiActions } from 'redux/actions'

import App from 'components/App'

class AppContainer extends React.Component {
  static propTypes = {
    children     : PropTypes.element.isRequired,
    reduxActions : PropTypes.object.isRequired
  }

  componentWillMount () {
    this.props.reduxActions.auth.getUserRequest()
  }

  render () {
    return (
      <App children={this.props.children} {...this.props} />
    )
  }
}

function mapStateToProps (state) {
  return {
    reduxState: {
      coreui    : state.ui,
      account   : state.account
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    reduxActions : {
      coreui : bindActionCreators(uiActions, dispatch),
      auth   : bindActionCreators(authActions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
