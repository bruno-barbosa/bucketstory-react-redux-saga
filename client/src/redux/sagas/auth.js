import { take, call, put } from 'redux-saga/effects'

import authApi from 'utils/authApi'
import { authTypes } from 'redux/constants'

export function * registerSaga () {
  while (true) {
    const request = yield take(authTypes.SIGNUP_REQUEST)
    let response = yield call(authApi.register, request.payload)

    if (response.statusText || response.error) {
      yield put({ type: authTypes.SIGNUP_FAILURE, response })
    }

    yield put({ type: authTypes.SIGNUP_SUCCESS, response })
  }
}

const authSagas = [
  registerSaga
]

export default authSagas
