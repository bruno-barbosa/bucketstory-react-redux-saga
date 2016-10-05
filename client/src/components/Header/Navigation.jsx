import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import { Navigation, Menu, MenuItem, Button, Textfield } from 'react-mdl'
import { publicMenu, authMenu } from './MenuList'

const NavigationComponent = ({ handleToggle, userAccount }) => {
  require('./header.scss')

  return (
    <Navigation>

      {(!userAccount.authenticated)
      ? publicMenu.map(menuItem =>
        <Link
          key={menuItem.key}
          to={menuItem.link}
          className='header-link'
          >
          {menuItem.name}
        </Link>
      )
      : authMenu.map(menuItem =>
        <Link
          key={menuItem.key}
          to={menuItem.link}
          className='header-link'
          >
          {menuItem.name}
        </Link>
      )}
      <Textfield
        value=''
        className='header-icons'
        onChange={() => {}}
        label='Search'
        expandable
        expandableIcon='search'
        />

      {(!userAccount.authenticated)
        ? <Button
          ripple
          className='header-button'
          onClick={() => handleToggle(true)}
          >
          <i className='material-icons'>person</i>
          Connect
        </Button>
        : <div style={{ position: 'relative' }}>
          <img className='header-avatar'
            src={userAccount.profile.picture}
            alt={userAccount.profile.name}
            id='avatar'
          />
          <Menu className='header-avatar__menu'target='avatar' align='right'>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>
        </div>
      }
    </Navigation>
  )
}

NavigationComponent.propTypes = {
  handleToggle  : PropTypes.func.isRequired,
  userAccount   : PropTypes.object.isRequired
}

export default NavigationComponent
