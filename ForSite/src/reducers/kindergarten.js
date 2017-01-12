import * as types from '../actions/types'


const kinderClasses = {
  id: null,
  name: null,
  students: null
}
const kinder = {
  id: null,
  name: null,
  kinderClasses: [...kinderClasses]
}

const initialState = {
  kinder: [...kinder]
}

const KinderClass = (state , action) => {
  switch (action.type) {
    case types.ADD_CLASS:
      return [...state.kinderClasses, {
        parentId: action.classId,
        id: action.childId,
        className: null,
        students: null
      }]
    case types.UPDATE_KINDER_CLASS:
      return state.kinderClasses.map((kinderclass) => {
        if(kinderclass.id === action.classId){
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
      return [...state.kinder, {
        code: null,
        name: null,
        id: action.childId,
        kinderClasses:[]
      }]
    case types.UPDATE_KINDER:
      return state.kinder.map((kinder) => {
        if(kinder.id === action.id){
          return {...kinder,
            name: action.name,
            address: action.address,
            phone: action.phone,
            manager: action.manager,
            managerPh: action.managerPh
          }
        } else { return kinder }
      })
    default:
      return state
  }
}


const deleteKinder = (state, id) => (
  state.filter(kinder => kinder.id !== id)
)


export default (state = initialState , action) => {
  const { nodeId, classId } = action
  switch (action.type) {
    case types.CREATE_KINDER:
      return {
        ...state,
        kinder: [...state.kinder]
      }
    case types.ADD_KINDER:
    case types.UPDATE_KINDER:
    case types.DELETE_KINDER:
      return {
        kinder: (action.type == types.DELETE_KINDER ? deleteKinder(state.kinder, action.id): Kinder(state, action))
      }
    case types.ADD_CLASS:
    case types.UPDATE_KINDER_CLASS:
    case types.DELETE_KINDER_CLASS:
      return {
        ...state,
        kinder: state.kinder.map((item, index) => ({
          ...item,
          kinderClasses: action.type == types.DELETE_KINDER_CLASS ? deleteKinder(item.kinderClasses, action.id) : (index==action.id ? KinderClass(item, action) : item.kinderClasses)
        }))
      }
    default:
      return state
  }
}
