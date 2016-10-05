import React, { PropTypes } from 'react'

import { IndexLink } from 'react-router'

import { Header, Drawer } from 'components/Header'
import Auth from 'components/Auth'
import { Layout, Content } from 'react-mdl'

import 'react-mdl/extra/material.js'

import Spinner from 'components/Spinner'

const Body = (children) => (
  <Content className='app-container'>
    {children}
  </Content>
)
const isLoading = false

const AppComponent = ({ children, ...props }) => {
  require('./app.scss')

  return (
    <Layout>
      <Header
        reduxState={props.reduxState}
        reduxActions={props.reduxActions}
        reduxRoutes={props.routes} />
      <Drawer />
      <Auth
        authDialog={props.reduxState.coreui.header.authDialog}
        handleToggle={props.reduxActions.coreui.authToggle}
        authActions={props.reduxActions.auth}
        userAccount={props.reduxState.account}
      />
      {
        (isLoading)
        ? <Spinner />
        : Body(children)
      }
    </Layout>
  )
}

AppComponent.propTypes = {
  children      : PropTypes.element.isRequired,
  reduxActions : PropTypes.shape({
    coreui  : PropTypes.object.isRequired,
    auth    : PropTypes.object.isRequired
  }),
  reduxState  : PropTypes.shape({
    coreui    : PropTypes.object.isRequired,
    account   : PropTypes.object.isRequired
  }),
  routes        : PropTypes.array.isRequired
}

export default AppComponent
