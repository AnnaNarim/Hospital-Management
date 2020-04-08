import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ProtectedRoute from './routeComponents/ProtectedRoute';
import PublicRoute from './routeComponents/PublicRoute';

import Login from './containers/Login';
// import Logout from './containers/Logout';
// import SignUp from './containers/SignUp';
import Home from './containers/Home';
// import NotFound from './containers/NotFound';

const routes = (
  <>
    <Switch>
      <Redirect exact from="/" to="/home" />

      <ProtectedRoute exact path="/home" component={Home} />
      <PublicRoute path="/login" component={Login} />
    </Switch>
  </>
);

export default routes;


// <ProtectedRoute path="/logout" component={Logout} />

//       <PublicRoute path="/login" component={Login} />
//       <PublicRoute path="/signup" component={SignUp} />

//       <Route path="*" component={NotFound} />