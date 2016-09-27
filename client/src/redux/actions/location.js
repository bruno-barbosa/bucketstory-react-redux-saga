import { locationTypes } from 'redux/constants'

export function change (location = '/') {
  return {
    type    : locationTypes.LOCATION_CHANGE,
    payload : location
  }
}

export const update = ({ dispatch }) => {
  return (nextLocation) => dispatch(change(nextLocation))
}
