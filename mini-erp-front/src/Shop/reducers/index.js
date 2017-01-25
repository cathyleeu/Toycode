import * as types from '../constants/types'

const initialState = {
  products: [],
  userInvoices: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.COMPLETE_BOOKS_FETCH:
     return { ...state, products:action.books}
   case types.COMPLETE_INVOICES_FETCH:
     return { ...state, userInvoices:action.invoices}
   default:
     return state
  }
}
