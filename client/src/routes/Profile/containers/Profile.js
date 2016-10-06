import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import ProfileView from '../components/Profile'

class ProfileContainer extends React.Component {
  static propTypes = {}

  constructor (props, context) {
    super(props, context)
  }

  render () {
    console.log('profile props', this.props)
    return <ProfileView />
  }
}

export default connect()(ProfileContainer)
