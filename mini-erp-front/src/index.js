import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './Routers'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk'
import Async from './middlewares/async'
import reducers from './RootReducer';
import { getInvoices } from './Shop/actions/cart'
import { fetchBooks } from './Shop/actions/products'
import { fetchUser } from './Auth/actions'
import './index.css';
import * as types from './Auth/constants/types'

const createStoreWithMiddleware = applyMiddleware(reduxThunk, Async)(createStore);
const store = createStoreWithMiddleware(reducers, window.devToolsExtension ? window.devToolsExtension() : f => f)


const token = localStorage.getItem('token')
if (token) {
  store.dispatch({ type: types.AUTH_USER })
  store.dispatch(fetchUser())
}
store.dispatch(getInvoices())
store.dispatch(fetchBooks())

ReactDOM.render(
  <Provider store={store}>
    <Routers/>
  </Provider>,
  document.getElementById('root')
);
