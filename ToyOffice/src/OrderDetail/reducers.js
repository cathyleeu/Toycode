import * as types from './actions'

const initialState =  {
  detail: [],
  modiGoods: [],
  originGoods: []
}

const originGoodsDetail = (state, action) => {
  switch (action.type) {
    case types.IS_SAVE_MODI_ITEMS:
      return action.goods
    default:
      return state
  }
}

const modiGoodsDetail = (state, action) => {
  switch (action.type) {
    case types.IS_SAVE_MODI_ITEMS:
      return action.goods
    case types.IS_MODI_GOODS_QUTT:
      return state.map(item => {
        if(item.name === action.name){
          return { ...item, qutt: action.qutt, sales: action.qutt*item.price}
        } else {
          return item
        }
      })
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
    case types.IS_CANCLE_MODI:
      return { ...state, modiGoods: state.originGoods}
    default:
      return {
        ...state,
        modiGoods: modiGoodsDetail(state.modiGoods, action),
        originGoods: originGoodsDetail(state.originGoods, action)
      }
  }
}
