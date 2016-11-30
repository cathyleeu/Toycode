import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import reduxThunk from 'redux-thunk'


import App from './components/app';
import SigninPage from './components/auth/signinPage';
import SignupPage from './components/signup/signupPage';
import Feature from './components/feature';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path='signin' component={SigninPage}/>
        <Route path='signup' component={SignupPage}/>
        <Route path='feature' component={Feature}/>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
