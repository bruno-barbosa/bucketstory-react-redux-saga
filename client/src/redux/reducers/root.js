import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import locationReducer from './location'
import authReducer from './auth'

export const make = (asyncReducers) => {
  return combineReducers({
    location   : locationReducer,
    account    : authReducer,
    form       : formReducer,
    ...asyncReducers
  })
}

export const inject = (store, { key, reducers }) => {
  store.asyncReducers[key] = reducers
  store.replaceReducer(make(store.asyncReducers))
}

export default make
