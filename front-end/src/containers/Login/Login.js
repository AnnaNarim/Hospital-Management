import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { login } from '../../actions/auth';
import logo from "../../static/logo.png";
import background from "../../static/background.jpg";
import { styleOptions } from '../../styleOptions';
import './Login.css';

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  login() {
    const { email, password } = this.state;
    if (email && password) {
      this.props._login({ email, password });
    }
  }

  getView(width) {
    const { email, password } = this.state;
    const { error, loading } = this.props;
    const visible = !!error ? 'visible' : 'hidden';

    return (
      <React.Fragment>
        <Grid textAlign='center' style={{ height: '100vh', width: "500px", zIndex: 1 }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center' className='my-header'>
              <Image src={logo} />
              <span>Doctors</span>
            </Header>
            <Form size='large'>
              <Segment stacked style={{ padding: "45px", paddingTop: '7.5px' }}>
                <span className='error' style={{ visibility: visible, marginTop: '15px', marginBottom: '15px', display: 'block', height: "15px" }}>{error}</span>
                <Form.Input
                  onChange={(e) => this.handleChange(e)}
                  name='email'
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                />
                <Form.Input
                  fluid
                  onChange={(e) => this.handleChange(e)}
                  name='password'
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />
                <Button disabled={!email || !password} loading={loading} color='teal' fluid size='large' onClick={(item) => this.login(item)}>
                  Login
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
        <Image src={background} />
      </React.Fragment>
    );
  }

  render () {
    return (
      <div className='login'>
        {this.getView(styleOptions.smallContainer)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
  loading: state.auth.loading
});

function mapDispatchToProps(dispatch) {
  return {
    _login: data => dispatch(login(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
