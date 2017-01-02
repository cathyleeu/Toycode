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
    // case types.ADD_CLASS:
    //3) addKinder의 ADD_CHILD가 실행 되면
    case types.ADD_CHILD:
      return  {
        code: null,
        name: null,
        id: action.childId,
        kinderClasses:[]
      }
    case types.REMOVE_CHILD:
      return state.filter(id => id !== action.childId)
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
    case types.DELETE_KINDER_CLASS:
      return { ...state }
    case types.DELETE_KINDER:
      return { ...state }
    case types.ADD_CHILD:
      return [...state.kinder, addKinder(state, action)]
    case types.REMOVE_CHILD:
      return state.filter(id => id !== action.childId)
    default:
      return state
  }
}


const getAllDescendantIds = (state = initialState, nodeId) => (
  state[nodeId].childIds.reduce((acc, childId) => (
    [ ...acc, childId, ...getAllDescendantIds(state, childId) ]
  ), [])
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
      const descendantIdss = getAllDescendantIds(state, nodeId)
      return deleteMany(state, [ nodeId, ...descendantIdss ])
    case types.DELETE_KINDER_CLASS:
      const descendantIds = getAllDescendantIds(state, nodeId)
      return deleteMany(state, [ nodeId, ...descendantIds ])
    case types.ADD_CHILD:
      return {
        ...state,
        // TODO: 지사 이름을 받는 것을 Create_Kinder에서 따로 해야겠음.
        branch:{
          code:'DD',
          name: '대구지사',
          //1) node(state[nodeId]) => 빈값나옴
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
