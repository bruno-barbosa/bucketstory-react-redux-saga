import React, { PropTypes } from 'react'

import Dialog from 'components/Dialog' // Uses the custom component with polyfills
import { MDLComponent, DialogTitle, DialogContent, Tabs, Tab, IconButton } from 'react-mdl'

const AuthDialog = (props) => {
  require('./auth.scss')

  return (
    <Dialog className='auth-dialog__container' open={props.authDialog} >
      <IconButton
        className='auth-tab__button-close'
        onClick={() => props.handleToggle(false)}
        name='close' />
      <DialogTitle>
        <MDLComponent>
          <Tabs
            ripple
            className='auth-tab__header__link'
            activeTab={props.activeTab}
            onChange={props.handleTabChange}
            >
            <Tab>Sign In</Tab>
            <Tab>Register</Tab>
          </Tabs>
        </MDLComponent>
      </DialogTitle>
      <DialogContent>
        <section>
          {props.renderActiveTab()}
        </section>
      </DialogContent>
    </Dialog>
  )
}

AuthDialog.propTypes = {
  authDialog      : PropTypes.bool.isRequired,
  activeTab       : PropTypes.number.isRequired,
  handleToggle    : PropTypes.func.isRequired,
  handleTabChange : PropTypes.func.isRequired,
  renderActiveTab : PropTypes.func.isRequired
}

export default AuthDialog
