import { fork } from 'redux-saga/effects'

import authSagas from './auth'

export const make = (asyncSagas) => {
  return function * () {
    yield fork(...asyncSagas)
  }
}

export const inject = (store, { key, sagas }) => {
  if (store.asyncSagas[key]) {
    return
  }

  store.asyncSagas[key] = sagas
  store.runSaga(make(sagas))
}

export function * syncSagas () {
  yield [
    ...authSagas
  ]
}

export default make
