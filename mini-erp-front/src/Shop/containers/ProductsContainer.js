import React from 'react'
import { connect } from 'react-redux'
import { addToCartUnsafe } from '../actions/cart'
import { getAddedCart } from '../reducers/cart'
import {ProductsList, ProductItem} from '../components'


const ProductsContainer = ({books, selected, addToCartUnsafe}) => (
    <ProductsList title="1단계: 주문하실 교재를 선택하세요.">
      <div className="goods-list">
        {books.map((book, index) =>
          <ProductItem
            key={index}
            book={book}
            onAddToCartClicked={() => {
              selected.map((Id) => Id.id).indexOf(book.id) === -1 &&
                addToCartUnsafe(book.id, book.title, book.price)
            }}
          />
        )}
      </div>
    </ProductsList>
)


function mapStateToProps(state){
  return {
    books: state.shop.products,
    selected: getAddedCart(state)
  }
}

export default connect(mapStateToProps, { addToCartUnsafe })(ProductsContainer)
