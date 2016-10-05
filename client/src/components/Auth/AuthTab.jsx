import React, { PropTypes } from 'react'

import { Field, reduxForm } from 'redux-form'
import syncValidate from './syncValidate'

import { Grid, Cell, Textfield, Button } from 'react-mdl'
import Spinner from 'halogen/PulseLoader'

const renderTextField = ({ input, label, type, meta: { touched, error }, ...custom }) => {
  return (
    <Textfield
      floatingLabel
      label={label}
      type={type}
      error={touched && error}
      style={{ width: '200px' }}
      {...input}
      {...custom}
      />
  )
}

const AuthTab = (props) => {
  return (
    <Grid>
      <Cell col={6} >
        <form onSubmit={props.handleSubmit(data => props.handleAuth(data))} >

          {(props.authType === 'login')
          ? null
          : <Field name='name' component={renderTextField} label='Name' type='text' />}
          <Field name='email' component={renderTextField} label='Email' type='text' />
          <Field name='password' component={renderTextField} label='Password' type='password' />
          <Button type='submit' className='auth-tab__button-success'>
            {(props.userAccount.sendingRequest)
            ? <div className='auth-tab__button-loading'>
              <Spinner
                color='#ffffff'
                size='12px'
                margin='4px'
              />
            </div>
            : props.authText }
          </Button>
        </form>
      </Cell>
      <div className='auth-divider' />
      <Cell col={6} className='middle auth-tab__container'>
        <Button className='auth-tab__social auth-tab__social-google'>
          <span className='auth-tab__social-icon'>
            <i className='fa fa-google-plus fa-lg' aria-hidden-true />
          </span>
          <span className='auth-tab__social-text'>
            {props.authText} with Google
          </span>
        </Button>
        <Button className='auth-tab__social auth-tab__social-facebook'>
          <span className='auth-tab__social-icon'>
            <i className='fa fa-facebook fa-lg' aria-hidden-true />
          </span>
          <span className='auth-tab__social-text'>
            {props.authText} with Facebook
          </span>
        </Button>
        <Button className='auth-tab__social auth-tab__social-twitter'>
          <span className='auth-tab__social-icon'>
            <i className='fa fa-twitter fa-lg' aria-hidden-true />
          </span>
          <span className='auth-tab__social-text'>
            {props.authText} with Twitter
          </span>
        </Button>
      </Cell>
    </Grid>
  )
}

AuthTab.propTypes = {
  handleAuth      : PropTypes.func.isRequired,
  handleSubmit    : PropTypes.func.isRequired,
  userAccount     : PropTypes.object.isRequired,
  authText        : PropTypes.string.isRequired,
  authType        : PropTypes.string.isRequired
}

renderTextField.propTypes = {
  input          : PropTypes.object.isRequired,
  meta           : PropTypes.object.isRequired,
  label          : PropTypes.string.isRequired,
  type           : PropTypes.string.isRequired
}

export default reduxForm({
  form      : 'AuthForm',
  validate  : syncValidate
})(AuthTab)
