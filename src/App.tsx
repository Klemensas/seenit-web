import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';
import AuthRoute from './auth/AuthRoute';
import Navigation from './common/Navigation';

import Login from './auth/Login';
import Home from './Home';
import Profile from './profile/Profile';
import Show from './show/Show';
import Movie from './show/Movie';
import Setup from './setup/Setup';
import Dashboard from './dashboard/Dashboard';

export default function App() {
  return (
    <>
      <Navigation />
      <div>
        <Switch>
          <AuthRoute exact path="/" component={Dashboard} redirectComponent={Home} />
          <Route exact path="/setup" component={Setup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/show/:id" component={Show} />
          <Route path="/movie/:id" component={Movie} />
          <Route exact path="/profile/:name" component={Profile} />
        </Switch>
      </div>
    </>
  );
}
