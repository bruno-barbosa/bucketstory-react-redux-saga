import { call, fork, put, take } from 'redux-saga/effects'

import { authApi } from 'utils'
import { authTypes } from 'redux/constants'

// ======================================================
// Sagas
// ======================================================
function * loginFlow (request) {
  try {
    const payload = yield call(authApi.login, request)
    payload.statusText
    ? yield put({ type: authTypes.LOGIN_FAILURE, payload })
    : yield put({ type: authTypes.LOGIN_SUCCESS, payload })
  } catch (error) {
    yield put({ type: authTypes.LOGIN_FAILURE, error })
  }
}

function * registerFlow (request) {
  try {
    const payload = yield call(authApi.register, request)
    console.log('response', payload)
    payload.statusText
    ? yield put({ type: authTypes.REGISTER_FAILURE, payload })
    : yield put({ type: authTypes.REGISTER_SUCCESS, payload })
  } catch (error) {
    yield put({ type: authTypes.REGISTER_FAILURE, error })
  }
}

function * logoutFlow (request) {
  try {
    yield call(authApi.logout)
    yield put({ type: authTypes.LOGOUT_SUCCESS })
  } catch (error) {
    yield put({ type: authTypes.LOGOUT_SUCCESS, error })
  }
}

// ======================================================
// Watchers
// ======================================================
function * watchLogin () {
  while (true) {
    const { payload } = yield take(authTypes.LOGIN_REQUEST)
    yield fork(loginFlow, payload)
  }
}

function * watchRegister () {
  while (true) {
    const { payload } = yield take(authTypes.REGISTER_REQUEST)
    console.log('request', payload)
    yield fork(registerFlow, payload)
  }
}

function * watchLogout () {
  while (true) {
    const { payload } = yield take(authTypes.LOGOUT_REQUEST)
    yield fork(logoutFlow, payload)
  }
}

const authSagas = [
  fork(watchLogin),
  fork(watchRegister),
  fork(watchLogout)
]

export default authSagas
