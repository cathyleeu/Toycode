import * as types from './actions'
import * as loginTypes from '../Login/actions'


const initialState =  {
  branch: {},
  manager: {}
}

const filterStateByUser = (state, action) => {
  let { branch, education, account } = action.user;
  switch (action.user.customerType) {
    case "T":
      return state
    case "A":
    case "B":
    case "C":
    case "D":
    case "E":
      return {
        ...state,
        branch: {
          ...branch,
          ...branch.address,
          phone: '',
          fax: ''
        },
        manager: {
          ...education,
          ...account
        }
      }
    default:
      return state
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.IS_DEFALUT_MODI:
    case loginTypes.GET_USER_INFO :
      return filterStateByUser(state, action)
    case types.IS_MODIFYING_INFO:
      return {
        ...state,
        [action.modiType]: {
          ...state[action.modiType],
          [action.modiKey]: action.modiTxt
        }
      }
    default:
      return state
  }
}
