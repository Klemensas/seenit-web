import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.scss';
import AuthRoute from './auth/AuthRoute';
import Home from './Home';
import Login from './auth/Login';
import Profile from './profile/Profile';
import Show from './show/Show';
import Movie from './show/Movie';
import Setup from './setup/Setup';
import Navigation from './common/Navigation';

export default function App() {
  return (
    <>
      <Navigation />
      <div>
        <Switch>
          <AuthRoute exact path="/" component={Home} />
          <Route exact path="/profile/:name" component={Profile} />
          <Route exact path="/show/:id" component={Show} />
          <Route path="/movie/:id" component={Movie} />
          <Route exact path="/setup" component={Setup} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </>
  );
}
