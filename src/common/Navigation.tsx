import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Navbar,
  Alignment,
  Button,
  Popover,
  Menu,
  Position,
  MenuItem,
} from '@blueprintjs/core';

import { Logo } from './Logo';
import { SearchPage } from './Search';
import { useLogoutMutation, useAuthQuery } from '../graphql';

export function UserBlock() {
  const [setAuth] = useLogoutMutation();
  const { data } = useAuthQuery();

  if (!data?.auth) {
    return (
      <Link to={`/login`}>
        <Button minimal icon="user">
          Login
        </Button>
      </Link>
    );
  }

  return (
    <Popover
      content={
        <Menu>
          <Link to={`/profile/${data.auth.name}`}>
            <MenuItem tagName="span" text={'Profile'} />
          </Link>
          <Link to="/settings">
            <Button minimal>Settings</Button>
          </Link>
          <MenuItem tagName="span" text={'Logout'} onClick={() => setAuth()} />
        </Menu>
      }
      position={Position.BOTTOM}
    >
      {data.auth.name}
    </Popover>
  );
}

export default function Navigation() {
  return (
    <div className="navigation-container">
      <Navbar fixedToTop>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <NavLink to="/">
              <Logo />
            </NavLink>
          </Navbar.Heading>
          <Navbar.Divider />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <SearchPage />
          <Navbar.Divider />
          <UserBlock />
        </Navbar.Group>
      </Navbar>
    </div>
  );
}
