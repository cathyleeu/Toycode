import * as types from '../actions/types'


const initialState = {
  addedKinder: {},
  addedClass: []
}

//redux 활용해서 하기!!!!
export const addedKinder = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_KINDER:
      return {
        id: action.kinderId
      }
    default:
      return state

  }
}
// [[action.kinderId]: action.kinderName ]


export default function (state = initialState , action) {
  switch (action.type) {
    case types.COMPLETE_ADD_KINDER:
      return {...state, updated: true}
    default:
      return {
        
        [action.kinderId]: addedKinder(state[action.kinderId], action)
      }
  }
}
