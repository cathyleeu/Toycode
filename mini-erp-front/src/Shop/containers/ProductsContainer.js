import React from 'react'
import { connect } from 'react-redux'
import { addToCartUnsafe } from '../actions/cart'
import { getAddedCart } from '../reducers/cart'
import {ProductsList, ProductItem} from '../components'


const ProductsContainer = ({books, selected, addToCartUnsafe, customType}) => (
    <ProductsList title="1단계: 주문하실 교재를 선택하세요.">
      <div className="goods-list">
        {books.map((book, index) =>
          <ProductItem
            key={index}
            book={book}
            onAddToCartClicked={() => {
              selected.map((Id) => Id.id).indexOf(book.code) === -1 &&
                addToCartUnsafe(book.code, book.title, customType === "A" ? book.bPrice : book.dPrice)
            }}
          />
        )}
      </div>
    </ProductsList>
)


function mapStateToProps(state){
  return {
    books: state.shop.products,
    selected: getAddedCart(state),
    customType: state.auth.user.customerType
  }
}

export default connect(mapStateToProps, { addToCartUnsafe })(ProductsContainer)
