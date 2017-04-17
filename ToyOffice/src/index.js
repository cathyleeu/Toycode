import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk'
import reducers from './RootReducer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Routers from './Routers'
import {tempoUserState} from './Login/actions'
import './index.css';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, window.devToolsExtension ? window.devToolsExtension() : f => f)
injectTapEventPlugin();

store.dispatch(tempoUserState())


ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Routers />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);



// import React from 'react';
// import ReactDOM from 'react-dom';
// import Routers from './Routers'
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import reduxThunk from 'redux-thunk'
// import Async from './middlewares/async'
// import reducers from './RootReducer';
// import { fetchBooks } from './Shop/actions/products'
//
// import './index.css';
//
//
// const createStoreWithMiddleware = applyMiddleware(reduxThunk, Async)(createStore);
// const store = createStoreWithMiddleware(reducers, window.devToolsExtension ? window.devToolsExtension() : f => f)
//
//
// store.dispatch(fetchBooks())
//
// ReactDOM.render(
//   <Provider store={store}>
//     <Routers/>
//   </Provider>,
//   document.getElementById('root')
// );
