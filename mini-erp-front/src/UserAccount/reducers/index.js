import * as types from '../constants/types'
import { INITIAL_KINDER } from '../../Auth/constants/types'

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
  status: false
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
            address: action.address,
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
  const { nodeId, classId } = action
  switch (action.type) {
    case INITIAL_KINDER:
      return { ...state, kinders:[...action.kinder]}
    case types.ADD_KINDER:
    case types.UPDATE_KINDER:
    case types.DELETE_KINDER:
      return {
        ...state,
        kinders: (action.type == types.DELETE_KINDER ? deleteKinder(state.kinders, action.id): Kinder(state, action))
      }
    case types.ADD_CLASS:
    case types.UPDATE_KINDER_CLASS:
    case types.DELETE_KINDER_CLASS:
      return {
        ...state,
        kinders: state.kinders.map((item, index) => ({
          ...item,
          kinderClasses: action.type == types.DELETE_KINDER_CLASS ? deleteKinder(item.kinderClasses, action.id) : (index==action.id ? KinderClass(item, action) : item.kinderClasses)
        }))
      }
    case types.EDITING_KINDER:
    case types.COMPLETE_ADD_KINDER:
      return { ...state, status: action.status}
    default:
      return state
  }
}
