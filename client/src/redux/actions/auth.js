import { authTypes } from 'redux/constants'

export function singinRequest (signinRequest) {
  return { type: authTypes.SIGNIN_REQUEST, signinRequest }
}

export function signinSuccess (payload) {
  return { type: authTypes.SIGNIN_SUCCESS, payload }
}

export function signupRequest (payload) {
  return { type: authTypes.SIGNUP_REQUEST, payload }
}

export function signupSuccess (payload) {
  return { type: authTypes.SIGNUP_SUCCESS, payload }
}

export function logoutRequest (payload) {
  return { type: authTypes.LOGOUT_REQUEST, payload }
}

export function logoutSuccess () {
  return { type: authTypes.LOGOUT_SUCCESS }
}
