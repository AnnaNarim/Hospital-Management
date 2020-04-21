import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ProtectedRoute from './routeComponents/ProtectedRoute';
import PublicRoute from './routeComponents/PublicRoute';

import Login from './containers/Login';
// import Logout from './containers/Logout';
// import SignUp from './containers/SignUp';
import Home from './containers/Home';
import Nurses from './containers/Nurses';
// import Patients from './containers/Patients';
import NotFound from './containers/NotFound';

const routes = (
  <>
    <Switch>
      <Redirect exact from="/" to="/home" />

      <ProtectedRoute exact path="/home" component={Home} />
      <ProtectedRoute exact path="/my/nurse" component={Nurses} />
      <ProtectedRoute exact path="/my/nurse/:nurseId" component={Nurses} />

      <PublicRoute path="/login" component={Login} />

      <Route path="*" component={NotFound} />
    </Switch>
  </>
);

export default routes;
// <ProtectedRoute exact path="/my/patients" component={Patients} />

// <ProtectedRoute path="/logout" component={Logout} />

//       <PublicRoute path="/signup" component={SignUp} />
