import { combineReducers } from 'redux';
import login from './Login/reducers'
import goods from './Shop/reducers'
import order from './OrderDetail/reducers'
// import shop from './Shop/reducers'
// import auth from './Auth/reducers'
// import cstList from './CustomerLists/reducers'
// import cstIVes from './CustomerInvoices/reducers'
// import userAccount from './UserAccount/reducers'
// import issuedLogin from './IssuedLogin/reducers'
// import statement from './Statement/reducers'
// import commonData from './reducers'
// import notice from './Feature/reducers'

const rootReducer = combineReducers({
  login, goods, order
  // products,
});


export default rootReducer;
