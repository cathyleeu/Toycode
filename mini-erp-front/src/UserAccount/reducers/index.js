import * as types from '../constants/types'
import { STATUS_ON_LOGIN } from '../../Auth/constants/types'

const kinderClasses = {
  _id: null,
  name: null,
  level: null
}
const kinders = {
  _id: null,
  name: null,
  parentId: null,
  kinderClasses: [...kinderClasses]
}

const initialState = {
  kinders: [...kinders],
  branchEdit: false,
  userEdit: false,
  managers: {}
}

const KinderClass = (state , action) => {
  switch (action.type) {
    case types.ADD_CLASS:
      return [...state.kinderClasses, {
        parentId: action.classId,
        _id: action.childId,
        className: null,
        level: null
      }]
    case types.UPDATE_KINDER_CLASS:
      return state.kinderClasses.map((kinderclass) => {
        if(kinderclass._id === action.classId){
          return {...kinderclass, className: action.classname, level: action.level}
        } else { return kinderclass }
      })
    default:
      return state
  }
}

const Kinder = (state, action) => {
  switch (action.type) {
    case types.ADD_KINDER:
      return [...state.kinders, {
        code: null,
        name: null,
        _id: action.childId,
        kinderClasses:[]
      }]
    case types.UPDATE_KINDER:
      return state.kinders.map((kinder) => {
        const { name, zipNo, roadAddr, detailAddr, phone, manager, managerPh, parentId, lang } = action
        if(kinder._id === action.id){
          return { ...kinder, name, zipNo, roadAddr, detailAddr, phone, manager, managerPh, parentId, lang }
        } else { return kinder }
      })
    default:
      return state
  }
}


const deleteKinder = (state, id) => (
  state.filter(kinder => kinder._id !== id)
)

const statusUser = (state, user) => {
  let { education, account } = user;
  let kinder = user.kinders || {};
  return {
           ...state,
           kinders:[ ...kinder ],
           managers: { account, education }
         }
}

export default (state = initialState , action) => {
  switch (action.type) {
    case STATUS_ON_LOGIN:
      return statusUser(state, action.response.user)
    case types.ADD_KINDER:
    case types.UPDATE_KINDER:
    case types.DELETE_KINDER:
      return {
        ...state,
        kinders: (action.type === types.DELETE_KINDER ? deleteKinder(state.kinders, action.id): Kinder(state, action))
      }
    case types.ADD_CLASS:
    case types.UPDATE_KINDER_CLASS:
    case types.DELETE_KINDER_CLASS:
      return {
        ...state,
        kinders: state.kinders.map((item, index) => ({
          ...item,
          kinderClasses: action.type === types.DELETE_KINDER_CLASS ? deleteKinder(item.kinderClasses, action.id) : (index === action.id ? KinderClass(item, action) : item.kinderClasses)
        }))
      }
    case types.EDITING_KINDER:
    case types.COMPLETE_ADD_KINDER:
      return { ...state, branchEdit: action.branchEdit }
    case types.EDITING_USER:
    case types.EDITED_USER:
      return { ...state, userEdit: action.userEdit}
    case types.UPDATE_USER:
     const { A_manager, A_email, A_phone, E_manager, E_email, E_phone, sub_name } = action;
      return { ...state, managers: {
        sub_name,
        account:{ A_manager, A_email, A_phone },
        education:{ E_manager, E_email, E_phone },
      }
    }
    default:
      return state
  }
}
