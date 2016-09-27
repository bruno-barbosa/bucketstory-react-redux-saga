import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import { Navigation, Button, Textfield } from 'react-mdl'
import { publicMenu } from './MenuList'

const NavigationComponent = ({ handleToggle }) => {
  require('./header.scss')

  return (
    <Navigation>
      {publicMenu.map(menuItem =>
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
      <Button
        ripple
        className='header-button'
        onClick={() => handleToggle('authBoolean')}
        >
        <i className='material-icons'>person</i>
        Connect
      </Button>
    </Navigation>
  )
}

NavigationComponent.propTypes = {
  handleToggle  : PropTypes.func.isRequired
}

export default NavigationComponent
