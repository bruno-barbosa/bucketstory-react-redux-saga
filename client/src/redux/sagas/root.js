import { fork } from 'redux-saga/effects'

export const make = (asyncSagas) => {
  return function* rootSaga () {
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

export default make
