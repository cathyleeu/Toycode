import * as types from './actions'

const initialState =  {
  detail: [],
  modiGoods: []
}


const modiGoodsDetail = (state, action) => {
  switch (action.type) {
    case types.IS_OPEN_MODI_MODAL:
      return action.goods
    case types.IS_MODI_GOODS_QUTT:
      return state.map(item => {
        if(item.name === action.name){
          return { ...item, qutt: action.qutt}
        } else {
          return item
        }
      })
    case types.IS_CANCLE_MODI:
      return state
    case types.IS_DELETE_GOODS:
      return state.filter(item => item.name !== action.name)
    default:
      return state
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case types.COMPLETE_INVOICES_FETCH:
      return { ...state, detail: action.detail}
    case types.IS_CANCLE_ALL_GOODS:
      return state
    default:
      return {
        ...state,
        modiGoods: modiGoodsDetail(state.modiGoods, action)
      }
  }
}
