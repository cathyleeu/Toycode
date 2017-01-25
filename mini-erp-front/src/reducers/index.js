import * as types from '../actions/types'

const initialState = {
  juso:[],
  selectedJuso:{}
}



export default function(state = initialState, action) {
  switch (action.type) {
   case types.COMPLETE_ADDRESS_FETCH:
     return { ...state, juso:action.juso}
   case types.SELECTED_JUSO:
     return {...state, selectedJuso:{
       zipNo: action.zipNo,
       roadAddr: action.roadAddr
     }
   }
   default:
    return state
  }
}
