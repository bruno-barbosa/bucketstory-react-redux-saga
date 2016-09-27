import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import App from 'components/App'

class AppContainer extends React.Component {
  static propTypes = {
    children  : PropTypes.element.isRequired
  }

  render () {
    return (
      <App children={this.props.children} />
    )
  }
}

export default connect()(AppContainer)
