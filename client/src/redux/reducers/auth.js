import { authTypes } from 'redux/constants'

const authState = {
  user : {
    name    : '',
    email   : '',
    password: ''
  },
  authenticated   : false, // add a function that returns a boolean instead
  sendingRequest  : false,
  error           : ''
}

export default function authReducer (state = authState, action) {
  switch (action.type) {
    case authTypes.SIGNIN_REQUEST:
      return { ...state, sendingRequest: action.signinRequest }
    case authTypes.SIGNIN_SUCCESS:
      return { ...state, authenticated: action.payload.authenticated }
    case authTypes.SIGNIN_FAIL:
      return { ...state, error: action.payload.error }
    default:
      return state
  }
}
