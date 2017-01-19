import { combineReducers } from 'redux';
import cart from './Shop/reducers/cart'
import shop from './Shop/reducers'
import auth from './Auth/reducers'
import userAccount from './UserAccount/reducers'

const rootReducer = combineReducers({
  auth, shop, cart, userAccount
  // products,
});


export default rootReducer;
