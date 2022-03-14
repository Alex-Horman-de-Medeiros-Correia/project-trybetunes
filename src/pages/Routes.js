import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Search from './Search';
import Album from './Album';
import Favorites from './Favorites';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import NotFound from './NotFound';
import Login from './Login';

class Routes extends React.Component {
  render() {
    return (
      <Switch>

        <Route path="/search" component={ Search } />

        <Route path="/album/:id" component={ Album } />

        <Route path="/favorites" component={ Favorites } />

        <Route path="/profile" component={ Profile } />

        <Route path="/profile/edit" component={ ProfileEdit } />

        <Route path="*" component={ NotFound } />

        <Route exact path="/" component={ Login } />

      </Switch>
    );
  }
}

export default Routes;
