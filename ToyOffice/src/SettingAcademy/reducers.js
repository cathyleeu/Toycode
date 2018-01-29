import * as types from './actions'
import { GET_USER_INFO } from '../Login/actions'

const kinderClasses = {
  _id: null,
  name: null,
  level: null
}
const kinders = {
  _id: null,
  name: null,
  parentId: null,
  kinderClasses: [...kinderClasses],
}
const classInfo = {
  // classId: null,
  // studentNames: []
}
const initialState =  {
  kinders: [...kinders],
  students: [...classInfo]
}


const AcademyClass = (state , action) => {
  switch (action.type) {
    case types.ADD_ACADEMY_CLASS:
      // debugger
      return [...state.kinderClasses, {
        parentId: action.classId,
        _id: action.childId,
        className: null,
        level: null
      }]
    // case types.UPDATE_KINDER_CLASS:
    //   return state.kinderClasses.map((kinderclass) => {
    //     if(kinderclass._id === action.classId){
    //       return {...kinderclass, className: action.classname, level: action.level}
    //     } else { return kinderclass }
    //   })
    default:
      return state
  }
}




const Academy = (state, action) => {
  switch (action.type) {
    case GET_USER_INFO:
      // const { account, education } = action;
      return { ...state,
               kinders:[...action.kinders]
             }
    case types.ADD_ACADEMY:
      return [...state.kinders, {
        code: null,
        name: null,
        _id: action.childId,
        kinderClasses:[]
      }]
    // case types.UPDATE_KINDER:
    //   return state.kinders.map((kinder) => {
    //     const { name, zipNo, roadAddr, detailAddr, phone, manager, managerPh, parentId, lang } = action
    //     if(kinder._id === action.id){
    //       return { ...kinder, name, zipNo, roadAddr, detailAddr, phone, manager, managerPh, parentId, lang }
    //     } else { return kinder }
    //   })
    default:
      return state
  }
}

const deleteAcademy = (state, id) => (
  state.filter(kinder => kinder._id !== id)
)

export default function (state = initialState, action) {
  switch (action.type) {
    case types.ADD_ACADEMY:
      return {
        ...state,
        kinders: (action.type === types.DELETE_KINDER ? deleteAcademy(state.kinders, action.id): Academy(state, action))
      }
    case types.FETCH_ACAMEDY:
      return {
        ...state,
        kinders: action.kinders
      }
    case types.ADD_ACADEMY_CLASS:
    // case types.UPDATE_ACADEMY_CLASS:
    // case types.DELETE_ACADEMY_CLASS:
    // debugger
      return {
        ...state,
        kinders: state.kinders.map((item, index) => ({
          ...item,
          kinderClasses: action.type === types.DELETE_KINDER_CLASS
            ? deleteAcademy(item.kinderClasses, +action.childId.slice(-1))
            : (index === +action.childId.slice(-1) ? AcademyClass(item, action) : item.kinderClasses)
        }))
      }
    case types.FETCH_STUDENT_NAMES:
      return {
        ...state,
        students: {
          ...state.students,
          [action.classId]: action.students
        }
      }
    default:
      return state
    }
}
