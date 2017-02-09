import * as types from '../constants/types'
import { STATUS_ON_LOGIN } from '../../Auth/constants/types'

const kinderClasses = {
  _id: null,
  name: null,
  students: null
}
const kinders = {
  _id: null,
  name: null,
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
        students: null
      }]
    case types.UPDATE_KINDER_CLASS:
      return state.kinderClasses.map((kinderclass) => {
        if(kinderclass._id === action.classId){
          return {...kinderclass, className: action.classname, students: action.students}
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
        if(kinder._id === action.id){
          return {...kinder,
            name: action.name,
            zipNo: action.zipNo,
            roadAddr: action.roadAddr,
            detailAddr: action.detailAddr,
            phone: action.phone,
            manager: action.manager,
            managerPh: action.managerPh,
            parentId: action.branchCode
          }
        } else { return kinder }
      })
    default:
      return state
  }
}


const deleteKinder = (state, id) => (
  state.filter(kinder => kinder._id !== id)
)


export default (state = initialState , action) => {
  switch (action.type) {
    case STATUS_ON_LOGIN:
      return { ...state,
              kinders:[...action.kinder],
              managers: {
                  account: action.account,
                  education:action.education
                }
              }
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
      return { ...state, branchEdit: action.branchEdit}
    case types.EDITING_USER:
    case types.EDITED_USER:
      return { ...state, userEdit: action.userEdit}
    case types.UPDATE_USER:
      return { ...state, managers: {
        account:{
          A_manager: action.a_manager,
          A_email: action.a_email,
          A_phone: action.a_phone
        },
        education:{
          E_manager: action.e_manager,
          E_email: action.e_email,
          E_phone: action.e_phone
        }
      }
    }
    default:
      return state
  }
}
