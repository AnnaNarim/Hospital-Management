import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicRoute = ({ component: Component, ...rest }) => (
 <Route
    {...rest}
    render={props => (
      rest.user.isLoggedIn ? (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      ) : (
        <Component {...props} {...rest} />
      )
    )}
  />
);

const mapStateToProps = state => ({
  user: state.auth.user
});
export default withRouter(connect(mapStateToProps, null)(PublicRoute));
