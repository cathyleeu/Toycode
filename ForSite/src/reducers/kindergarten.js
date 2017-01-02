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
  branch: {
    code: null,
    name: null,
    kinder: [...kinder]
  }
}

//유치원 추가
const addKinder = (state, action) => {
  switch (action.type) {

    //3) addKinder의 ADD_CHILD가 실행 되면
    case types.ADD_CHILD:
      return  {
        code: null,
        name: null,
        id: action.childId,
        kinderClasses:[]
      }
    default:
      return state
  }
}

const addKinderClass = (state , action) => {
  switch (action.type) {
    case types.ADD_CLASS:
      return [...state.kinderClasses, {
        parentId: action.classId,
        id: action.childId,
        className: null,
        students: null
      }]
    default:
      return state
  }
}

const node = (state, action) => {
  switch (action.type) {
    case types.ADD_CHILD:
      return [...state.kinder, addKinder(state, action)]
    default:
      return state
  }
}


const getAllDescendantIds = (state, id) => (
  state.filter(kinder => kinder.id !== id)
)

const deleteMany = (state = initialState, ids) => {
  state = { ...state }
  ids.forEach(id => delete state[id])
  return state
}

export default (state = initialState , action) => {
  const { nodeId, classId } = action
  switch (action.type) {
    case types.DELETE_KINDER:
      return {
        ...state,
        branch: {
          ...state.branch,
          kinder:getAllDescendantIds(state.branch.kinder, action.id)
        }
      }
    case types.DELETE_KINDER_CLASS:
      return {
        ...state,
        branch:{
          ...state.branch,
          kinder: state.branch.kinder.map((item, index) => ({
            ...item,
            kinderClasses: getAllDescendantIds(item.kinderClasses, action.id)
          }))
        }
      }
    case types.CREATE_KINDER:
      return {
        ...state,
        branch: {
          name: action.branchName,
          code: action.branchCode,
          kinder: [...state.branch.kinder]
        }
      }
    case types.ADD_CHILD:
      return {
        ...state,
        branch:{
          ...state.branch,
          kinder:node(state.branch, action)
        }
      }
    case types.ADD_CLASS:
      return {
        ...state,
        branch:{
          ...state.branch,
          kinder: state.branch.kinder.map((item, index) => ({
            ...item,
            kinderClasses: index==action.id ? addKinderClass(item, action) : item.kinderClasses
          }))
        }
      }
    default:
      return state
  }
}
