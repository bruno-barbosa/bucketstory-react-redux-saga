import { combineReducers } from 'redux'
import locationReducer from './location'

export const make = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    ...asyncReducers
  })
}

export const inject = (store, { key, reducers }) => {
  store.asyncReducers[key] = reducers
  store.replaceReducer(make(store.asyncReducers))
}

export default make
