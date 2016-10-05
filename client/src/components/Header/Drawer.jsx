import React from 'react'
import { IndexLink, Link } from 'react-router'

import { Drawer, Navigation } from 'react-mdl'
import { publicMenu } from './MenuList'

const DrawerComponent = () => {
  require('./header.scss')

  return (
    <Drawer title={
      <IndexLink to='/'>
        <img className='header-drawer__logo' src='./images/logo.svg' alt='bucketstory' />
      </IndexLink>
    }>
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
      </Navigation>
    </Drawer>
  )
}

export default DrawerComponent
