import { combineReducers } from 'redux';
import cart from './Shop/reducers/cart'
import shop from './Shop/reducers'
import auth from './Auth/reducers'
import userAccount from './UserAccount/reducers'
import commonData from './reducers'

const rootReducer = combineReducers({
  auth, shop, cart, userAccount, commonData
  // products,
});


export default rootReducer;
