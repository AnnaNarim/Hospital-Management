import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { Loader } from 'evermut';
import './App.css';
// import { fetchCurrentUser } from '../../actions/auth';

class App extends Component {
  constructor(props) {
    super(props);

    // props._getUser();

    this.state = {
      loading: true,
      propsLoading: props.loading
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (!prevState.propsLoading && nextProps.loading) {
  //     return { propsLoading: true };
  //   }
  //   if (prevState.propsLoading && !nextProps.loading) {
  //     return { propsLoading: false, loading: false };
  //   }

  //   if(nextProps.serverDown) {
  //     toaster.closeAll();
  //     toaster.danger(serverDown);
  //   }

  //   return null;
  // }

  render() {
    const { children, loading } = this.props;
    // const { loading } = this.state;

    return (
      <Container as='div' className='wrapper'>
        { (loading && <Loader />) || children }
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
});

export const mapDispatchToProps = dispatch => ({
  // _getUser: () => dispatch(fetchCurrentUser())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
