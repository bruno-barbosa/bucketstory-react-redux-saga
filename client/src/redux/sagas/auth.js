import { call, fork, put, take } from 'redux-saga/effects'

import { authApi } from 'utils/api'
import { authTypes, uiTypes } from 'redux/constants'

// ======================================================
// Sagas
// ======================================================
function * getUserFlow (request) {
  try {
    const payload = yield call(authApi.getUser, request)

    payload.error
    ? yield put({ type: authTypes.GETUSER_FAILURE, payload })
    : yield put({ type: authTypes.GETUSER_SUCCESS, payload })
  } catch (error) {
    yield put({ type: authTypes.GETUSER_FAILURE, error })
  }
}
function * loginFlow (request) {
  try {
    const payload = yield call(authApi.login, request)

    payload.error
    ? yield put({ type: authTypes.LOGIN_FAILURE, payload })
    : yield put({ type: authTypes.LOGIN_SUCCESS, payload })
  } catch (error) {
    yield put({ type: authTypes.LOGIN_FAILURE, error })
  }
}

function * registerFlow (request) {
  try {
    const payload = yield call(authApi.register, request)

    payload.error
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
function * watchGetUser () {
  while (true) {
    const { payload } = yield take(authTypes.GETUSER_REQUEST)
    yield fork(getUserFlow, payload)
  }
}
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
  fork(watchGetUser),
  fork(watchLogin),
  fork(watchRegister),
  fork(watchLogout)
]

export default authSagas
