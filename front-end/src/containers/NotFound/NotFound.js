import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

class NotFound extends Component {
  render () {
    return (
      <div className='not-found'>
        <Header as='h1'>404</Header>
        <Header as='h2'>Not Found</Header>
        <Header as='h4'>Requested page does not exist!</Header>
      </div>
    );
  }
}

export default NotFound;
