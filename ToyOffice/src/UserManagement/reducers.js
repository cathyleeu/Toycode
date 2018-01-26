import * as types from './actions'

const initialState =  {
  filterUser: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_PAGE:
      return {
        ...state,
        filterUser: action.filterUser,
        totalSize: action.totalSize,
        pageRange: action.pageRange
      }
    case types.REQUEST_AUTOCOMPLETE:
      return {
        ...state,
        autocomplete: action.autocomplete
      }
    default:
      return state
  }
}
