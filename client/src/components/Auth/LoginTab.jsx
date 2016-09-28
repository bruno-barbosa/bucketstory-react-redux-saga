import React, { PropTypes } from 'react'

import { Grid, Cell, Textfield, Button } from 'react-mdl'

const LoginTab = () => {
  return (
    <Grid>
      <Cell col={6} >
        <Textfield
          floatingLabel
          label='Email'
          type='email'
          onChange={() => {}}
          style={{ width: '200px' }}
          />
        <Textfield
          floatingLabel
          label='Password'
          type='password'
          onChange={() => {}}
          style={{ width: '200px' }}
          />
        <Button type='submit' className='auth-tab__button-success'>
          Login
        </Button>
      </Cell>
      <div className='auth-divider' />
      <Cell col={6} className='auth-tab__container'>
        <Button className='auth-tab__social auth-tab__social-google'>
          <span className='auth-tab__social-icon'>
            <i className='fa fa-google-plus fa-lg' aria-hidden-true />
          </span>
          <span className='auth-tab__social-text'>
            Sign in with Google
          </span>
        </Button>
        <Button className='auth-tab__social auth-tab__social-facebook'>
          <span className='auth-tab__social-icon'>
            <i className='fa fa-facebook fa-lg' aria-hidden-true />
          </span>
          <span className='auth-tab__social-text'>
            Sign in with Facebook
          </span>
        </Button>
        <Button className='auth-tab__social auth-tab__social-twitter'>
          <span className='auth-tab__social-icon'>
            <i className='fa fa-twitter fa-lg' aria-hidden-true />
          </span>
          <span className='auth-tab__social-text'>
            Sign in with Twitter
          </span>
        </Button>
      </Cell>
    </Grid>
  )
}

export default LoginTab
