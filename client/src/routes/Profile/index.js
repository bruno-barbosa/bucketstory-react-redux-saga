import { rootReducers } from 'redux/reducers'
import { rootSagas } from 'redux/sagas'

export default (store) => ({
  path        : 'profile',

  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Profile = require('./containers/Profile').default
      // const reducers = require('./modules/reducers').default
      // const sagas = require('./modules/sagas').default
      //
      // rootReducers.inject(store, { key: 'profile', reducers })
      // rootSagas.inject(store, { key: 'profile', sagas })

      cb(null, Profile)
    }, 'profile')
  }
})
