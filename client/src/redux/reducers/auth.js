/**
 * Only one reducer for REQUEST and FAILURE
 * could be used to handle all requests and failures
 * however for clarity's sake I've decided to use one each
 * disregarding the code repetition.
 *
 * This may be changed in the future.
 */

import { authTypes } from 'redux/constants'

const authState = {
  profile : {
    name      : '',
    email     : '',
    password  : '',
    role      : ''
  },
  authDialog      : false,
  authenticated   : false,
  sendingRequest  : false,
  error           : ''
}

export default function authReducer (state = authState, action) {
  switch (action.type) {
    case authTypes.GETUSER_REQUEST:
      return { ...state, profile: { ...action.payload, password: '' } }
    case authTypes.GETUSER_SUCCESS:
      return { ...state, profile: action.payload.profile, authenticated: true }
    case authTypes.GETUSER_FAILURE:
      return { ...state, error: action.payload.error, authenticated: false }

    case authTypes.LOGIN_REQUEST:
      return { ...state, profile: { ...action.payload, password: '' }, sendingRequest: true }
    case authTypes.LOGIN_SUCCESS:
      return { ...state, profile: action.payload.profile, authenticated: true, sendingRequest: false }
    case authTypes.LOGIN_FAILURE:
      return { ...state, error: action.payload.error, authenticated: false, sendingRequest: false }

    case authTypes.REGISTER_REQUEST:
      return { ...state, profile: { ...action.payload, password: '' }, sendingRequest: true }
    case authTypes.REGISTER_SUCCESS:
      return { ...state, profile: action.payload.profile, authenticated: true, sendingRequest: false }
    case authTypes.REGISTER_FAILURE:
      return { ...state, error: action.payload.error, authenticated: false, sendingRequest: false }

    default:
      return state
  }
}
