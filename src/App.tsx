import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';
import AuthRoute from './auth/AuthRoute';
import Navigation from './common/Navigation';

import Login from './auth/Login';
import Home from './Home';
import Profile from './profile/Profile';
import Setup from './setup/Setup';
import Dashboard from './dashboard/Dashboard';
import Movie from './show/Movie/Movie';
import Tv from './show/Tv/Tv';
import BasicLayout from './layouts/BasicLayout';

export default function App() {
  return (
    <>
      <Navigation />
      <div>
        <Switch>
          <AuthRoute
            exact
            path="/"
            component={Dashboard}
            redirectComponent={Home}
          />
          <Route path="/movie/:id" component={Movie} />
          <Route path="/tv/:id" component={Tv} />
          <Route exact path="/profile/:name" component={Profile} />
          <BasicLayout>
            <Switch>
              <Route exact path="/setup" component={Setup} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </BasicLayout>
        </Switch>
      </div>
    </>
  );
}
