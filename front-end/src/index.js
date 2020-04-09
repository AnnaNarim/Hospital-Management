import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import App from './containers/App';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

import routes from './routes';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
	  <Router>
	    <Route path="/" component={props => (
      	<App {...props}>
	      	{routes}
      	</App>
      	)}
      />
	  </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();