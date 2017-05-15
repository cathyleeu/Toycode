import * as types from './actions'


const initialState =  {
  branch: {},
  manager: {}
}


export default function (state = initialState, action) {
  switch (action.type) {
    case types.IS_DEFALUT_MODI:
      let { branch, education, account } = action.user;
      return {
        ...state,
        branch: {
          sub_name: branch.sub_name,
          location: branch.location,
          name: branch.name,
          license: branch.license,
          repr: branch.repr,
          detailAddr: branch.address.detailAddr,
          roadAddr: branch.address.roadAddr,
          zipNo: branch.address.zipNo,
          phone: '',
          fax: ''
        },
        manager: {
          E_phone: education.E_phone,
          E_email: education.E_email,
          E_manager: education.E_manager,
          A_phone: account.A_phone,
          A_email: account.A_email,
          A_manager: account.A_manager
        }
      }
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
