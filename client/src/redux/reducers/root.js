import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import uiReducer from './ui'
import authReducer from './auth'
import locationReducer from './location'

export const make = (asyncReducers) => {
  return combineReducers({
    ui         : uiReducer,
    account    : authReducer,
    location   : locationReducer,
    form       : formReducer,
    ...asyncReducers
  })
}

export const inject = (store, { key, reducers }) => {
  store.asyncReducers[key] = reducers
  store.replaceReducer(make(store.asyncReducers))
}

export default make
