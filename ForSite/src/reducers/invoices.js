import * as types from '../actions/types'


export default function(state = [], action) {
  switch (action.type) {
    case types.COMPLETE_INVOICES_FETCH:
     return [...state, ...action.invoices]
  }
  return state
}
