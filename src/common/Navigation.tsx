import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Alignment, Button } from '@blueprintjs/core';

import { Logo } from './Logo';
import { SearchPage } from './Search';

export default function Navigation() {
  return (
    <div className="navigation-container">
      <Navbar fixedToTop>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <Logo />
          </Navbar.Heading>
          <Navbar.Divider />
          <NavLink to="/">
            <Button minimal>Add item</Button>
          </NavLink>
          <NavLink to="/settings">
            <Button minimal>Settings</Button>
          </NavLink>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <SearchPage />
          <Navbar.Divider />
          <Button minimal icon="log-out" onClick={() => {}} />
        </Navbar.Group>
      </Navbar>
    </div>
  )
}