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
    case authTypes.LOGIN_REQUEST:
      return { ...state, profile: { ...action.payload, password: '' }, sendingRequest: true }
    case authTypes.LOGIN_SUCCESS:
      return { ...state, profile: { ...action.payload.profile }, authenticated: true, sendingRequest: false }
    case authTypes.LOGIN_FAILURE:
      return { ...state, error: action.payload.statusText, authenticated: false, sendingRequest: false }

    case authTypes.REGISTER_REQUEST:
      return { ...state, profile: { ...action.payload, password: '' }, sendingRequest: true }
    case authTypes.REGISTER_SUCCESS:
      return { ...state, profile: { ...action.payload.profile }, authenticated: true, sendingRequest: false }
    case authTypes.REGISTER_FAILURE:
      return { ...state, error: action.payload.statusText, authenticated: false, sendingRequest: false }

    default:
      return state
  }
}
