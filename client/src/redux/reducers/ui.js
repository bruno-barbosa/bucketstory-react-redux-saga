import { uiTypes } from 'redux/constants'

const uiState = {
  header : {
    authDialog : false
  }
}

export default function uiReducer (state = uiState, action) {
  switch (action.type) {
    case uiTypes.AUTH_TOGGLE:
      const authDialog = action.payload ? true : false  // eslint-disable-line
      return { ...state, header: { authDialog } }

    default:
      return state
  }
}
