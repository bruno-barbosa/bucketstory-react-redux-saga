import React from 'react'

import Spinner from 'halogen/PulseLoader'

export const HomeView = (props) => {
  require('./home.scss')
  return (
    <Spinner
      color='#3f51b5'
      size='16px'
      margin='4px'
    />
  )
}

export default HomeView
