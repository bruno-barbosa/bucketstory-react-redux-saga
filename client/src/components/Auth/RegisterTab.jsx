import React, { PropTypes } from 'react'

import { Grid, Cell, Textfield, Button } from 'react-mdl'

const RegisterTab = () => {
  return (
    <Grid>
      <Cell col={6} align='middle'>
        <Textfield
          floatingLabel
          label='Name'
          onChange={() => {}}
          style={{ width: '200px' }}
          />
        <Textfield
          floatingLabel
          label='Email'
          onChange={() => {}}
          style={{ width: '200px' }}
          />
        <Textfield
          floatingLabel
          type='password'
          label='Password'
          onChange={() => {}}
          style={{ width: '200px' }}
          />
        {/* <Textfield
          floatingLabel
          type='password'
          label='Confirm password'
          onChange={() => {}}
          style={{ width: '200px' }}
          /> */}
        <Button type='submit' className='auth-tab__button-success'>
            Submit
        </Button>
      </Cell>
      <div className='auth-divider' />
      <Cell col={6} align='middle auth-tab__container'>
        <Button className='auth-tab__social auth-tab__social-google'>
          <span className='auth-tab__social-icon'>
            <i className='fa fa-google-plus fa-lg' aria-hidden-true />
          </span>
          <span className='auth-tab__social-text'>
            Sign up with Google
          </span>
        </Button>
        <Button className='auth-tab__social auth-tab__social-facebook'>
          <span className='auth-tab__social-icon'>
            <i className='fa fa-facebook fa-lg' aria-hidden-true />
          </span>
          <span className='auth-tab__social-text'>
            Sign up with Facebook
          </span>
        </Button>
        <Button className='auth-tab__social auth-tab__social-twitter'>
          <span className='auth-tab__social-icon'>
            <i className='fa fa-twitter fa-lg' aria-hidden-true />
          </span>
          <span className='auth-tab__social-text'>
            Sign up with Twitter
          </span>
        </Button>
      </Cell>
    </Grid>
  )
}

export default RegisterTab
