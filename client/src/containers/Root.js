import React, { PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

class App extends React.Component {
  static propTypes = {
    routes   : PropTypes.object.isRequired,
    store    : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <Router
          history={browserHistory}
          children={routes}
        />
      </Provider>
    )
  }
}

export default App
