
import App from 'containers/App'
import Home from 'routes/Home'
import Profile from 'routes/Profile'
/*
  NOTE: Instead of using JSX, react-router
        PlainRoute objects are used to build route definitions.
 */
const requireAuth = (store) => (nextState) => {
  const state = store.getState()
  if (!state.account.authenticated) {
    const uiActions = require('redux/actions').uiActions
    store.dispatch(uiActions.authToggle(true))
  }
}

export const createRoutes = (store) => ({
  path        : '/',
  component   : App,
  indexRoute  : Home,
  childRoutes : [
    // Auth routes
    {
      onEnter     : requireAuth(store),
      // indexRoute  : Profile,
      childRoutes : [
        Profile(store)
      ]
    }
    // Non Auth Routes
    // HelpRoute,
    // ContactRoute
  ]
})

/*
  NOTE: childRoutes can be chunked or otherwise loaded programatically
        using getChildRoutes with the following signature:

  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        // Remove imports
        require('./Route').default(store)
      ])
    })
  }

  However, this is not  necessary for code-splitting! It simply provides
  an API for async route definitions. Your code splitting should occur
  inside the route 'getComponent' function, since it is only invoked
  when the route exists and matches.

 */

export default createRoutes
