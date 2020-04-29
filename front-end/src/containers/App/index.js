import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Loader } from 'evermut';
import './App.css';
import { currentUser } from '../../actions/auth';

class App extends Component {
  constructor(props) {
    super(props);

    props._getUser();
  }

  render() {
    const { children, loading } = this.props;

    return (
      <div className='wrapper'>
        { (loading && <Loader />) || children }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.currentUserLoading,
});

export const mapDispatchToProps = dispatch => ({
  _getUser: () => dispatch(currentUser())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
