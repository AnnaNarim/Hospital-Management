import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Divider, Header, Icon } from 'semantic-ui-react';
import { styleOptions } from '../../styleOptions';

class Home extends Component {
  getMyInfo() {
    return (
      <Container>my</Container>
    );
  }

  getDepartmentCards() {
    return (
      <Container>depart</Container>
    );
  }

  render () {
    return (
      <Container className='home'>
        <Divider horizontal>
          <Header as='h4'>
            <Icon name='info circle' />
            My Info
          </Header>
        </Divider>
        
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
});

function mapDispatchToProps(dispatch) {
  return {
    // _login: data => dispatch(login(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
