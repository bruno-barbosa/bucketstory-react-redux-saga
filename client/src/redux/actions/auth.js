import { authTypes } from 'redux/constants'

export function loginRequest (payload) {
  return { type: authTypes.LOGIN_REQUEST, payload }
}

export function loginSuccess (payload) {
  return { type: authTypes.LOGIN_SUCCESS, payload }
}

export function loginFailure (payload) {
  return { type: authTypes.LOGIN_FAILURE, payload }
}

export function registerRequest (payload) {
  return { type: authTypes.REGISTER_REQUEST, payload }
}

export function registerSuccess (payload) {
  return { type: authTypes.REGISTER_SUCCESS, payload }
}

export function registerFailure (payload) {
  return { type: authTypes.REGISTER_FAILURE, payload }
}

export function logoutRequest (payload) {
  return { type: authTypes.LOGOUT_REQUEST, payload }
}

export function logoutSuccess () {
  return { type: authTypes.LOGOUT_SUCCESS }
}
