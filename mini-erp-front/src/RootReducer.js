import { combineReducers } from 'redux';
import cart from './Shop/reducers/cart'
import shop from './Shop/reducers'
import auth from './Auth/reducers'
import cstList from './CustomerLists/reducers'
import cstIVes from './CustomerInvoices/reducers'
import userAccount from './UserAccount/reducers'
import issuedLogin from './IssuedLogin/reducers'
import statement from './Statement/reducers'
import commonData from './reducers'
import notice from './Feature/reducers'

const rootReducer = combineReducers({
  auth, shop, cart, userAccount, commonData, cstList, cstIVes, issuedLogin, statement, notice
  // products,
});


export default rootReducer;
