import { authTypes } from 'redux/constants'

const authState = {
  profile : {
    name      : '',
    email     : '',
    password  : '',
    role      : ''
  },
  authenticated   : false,
  sendingRequest  : false,
  error           : ''
}

export default function authReducer (state = authState, action) {
  switch (action.type) {
    case authTypes.SIGNIN_REQUEST:
      return { ...state, sendingRequest: action.payload }
    case authTypes.SIGNIN_SUCCESS:
      return { ...state, authenticated: action.payload.authenticated }
    case authTypes.SIGNIN_FAILURE:
      return { ...state, error: action.payload.error }

    case authTypes.SIGNUP_REQUEST:
      return { ...state, profile: { ...action.payload, password: '' }, sendingRequest: true }
    case authTypes.SIGNUP_SUCCESS:
      return { ...state, profile: { ...action.payload.profile }, authenticated: true, sendingRequest: false }
    case authTypes.SIGNUP_FAILURE:
      return { ...state, error: action.payload.statusText, authenticated: false, sendingRequest: false }

    default:
      return state
  }
}
