/**
 * Only one constant for REQUEST and FAILURE
 * could be used to handle all requests and failures
 * however for clarity's sake I've decided to use one each
 * disregarding the code repetition.
 *
 * This may be changed in the future.
 */

import { authTypes } from 'redux/constants'

export function getUserRequest (payload) {
  return { type: authTypes.GETUSER_REQUEST, payload }
}

export function getUserSuccess (payload) {
  return { type: authTypes.GETUSER_SUCCESS, payload }
}

export function getUserFailure (payload) {
  return { type: authTypes.GETUSER_FAILURE, payload }
}

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

export function logoutRequest () {
  return { type: authTypes.LOGOUT_REQUEST }
}

export function logoutSuccess () {
  return { type: authTypes.LOGOUT_SUCCESS }
}
