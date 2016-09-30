import { call, fork, put, take } from 'redux-saga/effects'

import authApi from 'utils/authApi'
import { authTypes } from 'redux/constants'

// ======================================================
// Sagas
// ======================================================
function * registerFlow (request) {
  try {
    const payload = yield call(authApi.register, request)
    console.log('response', payload)
    payload.statusText
    ? yield put({ type: authTypes.LOGIN_FAILURE, payload })
    : yield put({ type: authTypes.REGISTER_SUCCESS, payload })
  } catch (error) {
    yield put({ type: authTypes.REGISTER_FAILURE, error })
  }
}

function * loginFlow (request) {
  try {
    const payload = yield call(authApi.login, request)

    payload.statusText
    ? yield put({ type: authTypes.LOGIN_FAILURE, payload })
    : yield put({ type: authTypes.REGISTER_SUCCESS, payload })
  } catch (error) {
    yield put({ type: authTypes.LOGIN_FAILURE, error })
  }
}

// ======================================================
// Watchers
// ======================================================
function * watchRegister () {
  while (true) {
    const { payload } = yield take(authTypes.REGISTER_REQUEST)
    console.log('request', payload)
    yield fork(registerFlow, payload)
  }
}

function * watchLogin () {
  while (true) {
    const { payload } = yield take(authTypes.LOGIN_REQUEST)

    yield fork(loginFlow, payload)
  }
}

const authSagas = [
  watchRegister,
  watchLogin
]

export default authSagas
