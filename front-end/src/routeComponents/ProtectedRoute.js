import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { StickyMenu, Logo } from 'evermut';
import { styleOptions } from '../styleOptions';

import logo from "../static/logo4_light.png";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { history, path } = rest;
  const _onSelect = (to) => {
    history.push(`/${to}`);
  };
  const primaryMenu = [
    {
      logo: <Logo src={logo} />,
      props: {
        onSelect: () => _onSelect('home'),
        paddingTop: 10
      },
      active: false
    },
    {
      name: 'Departments',
      icon: 'panel-table',
      props: {
        onSelect: () => _onSelect('home'),
        paddingTop: 10
      },
      active: path.includes("/departments")
    },
  ];

  const secondaryMenu = [
    {
      name: 'Account',
      icon: 'people',
      props: {
        onSelect: () => history.push('/account'),
        paddingTop: 10
      },
      active: path.includes("account"),
    },
    {
      name: 'Log Out',
      icon: 'log-out',
      props: {
        onSelect: () => history.push('/logout'),
        paddingTop: 10
      },
      active: path.includes("logout")
    }
  ];

  const renderComponent = props => {
    // if (!rest.user.isLoggedIn && !rest.loading) {
    //   return (<Redirect to="/login" from={`${props.location}`} />);
    // } else {
      return (
        <div className='protected-route'>
            <StickyMenu
              stickBottom
              style={{
                width: "80px",
                display: 'inline-block',
                verticalAlign: 'top',
                backgroundColor: styleOptions.colors.primary,
                padding: 0
              }}
              primaryMenu={primaryMenu}
              secondaryMenu={secondaryMenu}
              selectedColor={styleOptions.colors.selected}
            />
          <div className='component'>
            <Component {...rest} {...props} />
          </div>
        </div>
      )
    // }
  };


  return ( <Route
    {...rest}
    render={props => renderComponent(props)}
  /> )
};

const mapStateToProps = state => ({
  user: state.auth.user,
  loading: state.auth.loading
});

export default withRouter(connect(mapStateToProps, null)(ProtectedRoute));
