import React, { PropTypes } from 'react'

import Header from 'components/Header'
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
      <Header />
      {
        (isLoading)
        ? <Spinner />
        : Body(children)
      }
    </Layout>
  )
}

AppComponent.propTypes = {
  children: PropTypes.element.isRequired
}

export default AppComponent
