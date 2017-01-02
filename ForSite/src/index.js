import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import reduxThunk from 'redux-thunk'
import Async from './middlewares/async'


import App from './components/app';
import requireAuth from './components/require_auth';
import {Signin, Signout, SignupForm} from './components/auth';
import {Account} from './components/account'
import Feature from './components/feature';
import Support from './components/support';
import LoginIssue from './components/login_issue';
import { OrderTable } from './components/order';

import {fetchBooks} from './actions/fetch'
import {fetchUser} from './actions'

import reducers from './reducers';
import * as types from './actions/types'

const createStoreWithMiddleware = applyMiddleware(reduxThunk, Async)(createStore);
const store = createStoreWithMiddleware(reducers, window.devToolsExtension ? window.devToolsExtension() : f => f)

const token = localStorage.getItem('token')
if (token) {
  store.dispatch(fetchUser())
  // store.dispatch({ type: types.STATUS_ON_LOGIN })
  store.dispatch({ type: types.AUTH_USER })
}
store.dispatch(fetchBooks())
// debugger


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Signin}/>
        <Route path='signin' component={Signin}/>
        <Route path='signout' component={Signout}/>
        <Route path='signup' component={SignupForm}/>
        <Route path='feature' component={requireAuth(Feature)}/>
        <Route path='support' component={requireAuth(Support)}/>
        <Route path='book_order' component={requireAuth(OrderTable)}/>
        <Route path='my_account' id={0} component={requireAuth(Account)}/>
        <Route path='login_issue' component={requireAuth(LoginIssue)}/>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
