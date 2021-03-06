import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ProtectedRoute from './routeComponents/ProtectedRoute';
import PublicRoute from './routeComponents/PublicRoute';

import Login from './containers/Login';
// import Logout from './containers/Logout';
// import SignUp from './containers/SignUp';
import Home from './containers/Home';
import Nurses from './containers/Nurses';
import Patients from './containers/Patients';
import DepartmentDoctors from './containers/DepartmentDoctors';
import DepartmentNurses from './containers/DepartmentNurses';
import NotFound from './containers/NotFound';

const routes = (
  <>
    <Switch>
      <Redirect exact from="/" to="/home" />

      <ProtectedRoute exact path="/home" component={Home} />

      <ProtectedRoute exact path="/my/nurses" component={Nurses} />
      <ProtectedRoute exact path="/my/nurses/:nurseId" component={Nurses} />
      <ProtectedRoute exact path="/my/patients" component={Patients} />
      <ProtectedRoute exact path="/my/patients/:patientId" component={Patients} />

      <ProtectedRoute exact path="/departments/:departmentId/doctors" component={DepartmentDoctors} />
      <ProtectedRoute exact path="/departments/:departmentId/doctors/:doctorId" component={DepartmentDoctors} />
      <ProtectedRoute exact path="/departments/:departmentId/nurses" component={DepartmentNurses} />
      <ProtectedRoute exact path="/departments/:departmentId/nurses/:nurseId" component={DepartmentNurses} />

      <PublicRoute path="/login" component={Login} />

      <Route path="*" component={NotFound} />
    </Switch>
  </>
);

export default routes;
// <ProtectedRoute exact path="/my/patients" component={Patients} />

// <ProtectedRoute path="/logout" component={Logout} />

//       <PublicRoute path="/signup" component={SignUp} />
