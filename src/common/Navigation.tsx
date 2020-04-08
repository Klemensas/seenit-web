import React, { ReactNode } from 'react';
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

export default function Navigation() {
  const [setAuth] = useLogoutMutation();
  const { data } = useAuthQuery();

  let userPart: ReactNode = '';
  if (data?.auth) {
    userPart = (
      <>
        <Popover
          content={
            <Menu>
              <Link to={`/profile/${data.auth.name}`}>
                <MenuItem tagName="span" text={'Profile'} />
              </Link>
              <MenuItem
                tagName="span"
                text={'Logout'}
                onClick={() => setAuth()}
              />
            </Menu>
          }
          position={Position.BOTTOM}
        >
          {data.auth.name}
        </Popover>
      </>
    );
  } else {
    userPart = (
      <Link to={`/login`}>
        <Button minimal icon="user">
          Login
        </Button>
      </Link>
    );
  }

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
          {userPart}
        </Navbar.Group>
      </Navbar>
    </div>
  );
}
