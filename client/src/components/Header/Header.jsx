import React, { PropTypes } from 'react'
import { IndexLink } from 'react-router'

import Navigation from './Navigation'

import { Header } from 'react-mdl'

const HeaderComponent = (props) => {
  return (
    <Header scroll className='header-navigation' title={
      <IndexLink to='/'>
        <img className='header-logo' src='./images/logo.svg' alt='bucketstory' />
      </IndexLink>
      }>
      <Navigation
        handleToggle={props.reduxActions.coreui.authToggle}
        userAccount={props.reduxState.account}
        routes={props.reduxRoutes}
        />
    </Header>
  )
}

HeaderComponent.propTypes = {
  reduxActions : PropTypes.shape({
    coreui  : PropTypes.object.isRequired,
    auth    : PropTypes.object.isRequired
  }),
  reduxState  : PropTypes.shape({
    coreui    : PropTypes.object.isRequired,
    account   : PropTypes.object.isRequired
  }),
  reduxRoutes : PropTypes.array.isRequired
}

export default HeaderComponent
