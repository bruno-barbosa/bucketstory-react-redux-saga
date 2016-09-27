import { applyMiddleware, compose, createStore } from 'redux'
import { browserHistory } from 'react-router'

import createSagaMiddleware from 'redux-saga'

import { rootReducers } from 'redux/reducers'
import { locationActions } from 'redux/actions'

export default (initialState = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const sagaMiddleware = createSagaMiddleware()

  const middleware = [sagaMiddleware]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEV__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store instantiation & HMR Setup
  // ======================================================
  const store = createStore(
    rootReducers.make(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  store.asyncReducers = {}
  store.asyncSagas = {}

  // to unsubscribe invoke store.unsubscribeHistory() anywhere
  store.unsubscribeHistory = browserHistory.listen(locationActions.update(store))

  store.runSaga = (saga) => {
    sagaMiddleware.run(saga)
  }

  if (module.hot) {
    module.hot.accept('redux/reducers/root', () => {
      const reducers = require('redux/reducers/root').default // eslint-disable-line

      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
