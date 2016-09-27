import { locationTypes } from 'redux/constants'

const initialState = null

export default function locationReducer (state = initialState, action) {
  return action.type === locationTypes.LOCATION_CHANGE
    ? action.payload
    : state
}
