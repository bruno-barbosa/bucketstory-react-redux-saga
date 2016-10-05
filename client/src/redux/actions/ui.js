import { uiTypes } from 'redux/constants'

export function authToggle (payload) {
  return { type: uiTypes.AUTH_TOGGLE, payload }
}
