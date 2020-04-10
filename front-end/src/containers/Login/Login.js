import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';
import { Login } from 'evermut';
// import { login } from '../../actions/auth';
import logo from "../../static/logo.png";
import background from "../../static/background.jpg";
import { styleOptions } from '../../styleOptions';
import './Login.css';

class LogIn extends Component {
  login(item) {
    if (item && item.email && item.password) {
      this.props._login({email: item.email, password: item.password});
    }
  }

  getView(width) {
    const { error, serverDown } = this.props;

    return (
      <>
        <Login
          buttonName='Login'
          logo={logo}
          logoStyle={{
            height: 95,
            transform: 'rotate(-45deg) translateX(1px)'
          }}
          rounded={true}
          logoBackground={styleOptions.colors.defaultBackground}
          login={item => this.login(item)}
          style={{
            color: 'red',
            margin: 'auto',
            background: '#daecb424',
            width
          }}
          error={error}
        />
        <Image src={background} />
      </>
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
});

function mapDispatchToProps(dispatch) {
  return {
    // _login: data => dispatch(login(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
