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
import { useSetIsLoggedInMutation, useUserDataQuery } from '../graphql';

export default function Navigation() {
  const [setLoggedIn] = useSetIsLoggedInMutation({
    variables: { isLoggedIn: false },
    update: (cache, { data }) => {
      // cache.writeData({
      //   data: {
      //     isLoggedIn: false,
      //     // TODO: replace with cache clearing once client 3.0 is available
      //     userData: null,
      //   },
      // });
    },
  });
  const { data } = useUserDataQuery();

  let userPart: ReactNode = '';
  // TODO: drop userData check once client 3.0 cache clear methods are available
  if (data?.userData) {
    userPart = (
      <>
        <Popover
          content={
            <Menu>
              <Link to={`/profile/${data.userData.name}`}>
                <MenuItem tagName="span" text={'Profile'} />
              </Link>
              <MenuItem
                tagName="span"
                text={'Logout'}
                onClick={() => setLoggedIn()}
              />
            </Menu>
          }
          position={Position.BOTTOM}
        >
          {data.userData.name}
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
