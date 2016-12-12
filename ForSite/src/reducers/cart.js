import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE
} from '../actions/types'

const initialState = {
  addedIds: [],
  quantityById: {}
}

const addedIds = ( state = initialState.addedIds, action) => {
  switch (action.type) {
    // 카트에 추가할때
    case ADD_TO_CART:
      if (state.indexOf(action.bookId) !== -1 ){
        //똑같은 상품 추가할때 오더 array에 추가하지 않고, 새로운 id가 있을때 추가한ㄷㅏ.
        //state에 action.productId가 존재한다면 (-1이 아니라면 존재)
        return state
        //state값을 리턴
      }
      return [...state, action.bookId]
      //전개연산자 : 배열인 어떤 값을 함수의 파라미터 순서대로 전달해주는 걸 의미
      //아니라면 설정한 state의 파라미터를 전달, action.productId를 전달

      // initialState.addedIds = [] 값과 선택한 상품의 id가 return
    // action {type: "ADD_TO_CART", bookId: 1}  => action/index.js 의 addToCart
    return state
  }
}


const quantityById = ( state = initialState.quantityById, action) => {
  switch (action.type) {
    case ADD_TO_CART:
    //ADD_TO_CART일때,
      const { bookId } = action
      // 프로덕트 ID는 액션
      // ??: 왜 중괄호 안에 들어가지? 오브젝트를 말하는감?
      return { ...state,
        [bookId]: (state[bookId] || 0) + 1
        // 갯수를 추가함
        // 0거나 state[productId] 에 1씩 추가
      }
    default:
      return state

  }
}

export const getQuantity = (state, bookId) =>
  state.quantityById[bookId] || 0
  // 주문하는 갯수가 0개 또는 선택한 추가량

export const getAddedIds = state => state

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState
    case CHECKOUT_FAILURE:
      return action.cart
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      }
  }
}


export default cart
