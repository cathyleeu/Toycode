import * as types from '../actions/types'


const initialState = {
  addedKinder: [],
  addedClass: []
}

export const addedKinder = (state = initialState.addKinder, action) => {
  switch (action.type) {
    case types.ADD_KINDER:
      return { ...state, name: action.kinderName }
    default:
      return state

  }
}


export default function (state = initialState , action) {
  switch (action.type) {
    case types.COMPLETE_ADD_KINDER:
      return {...state, updated: true}
    default:
      return {
        addedKinder: addedKinder(state.addedKinder, action)
      }
  }
}
