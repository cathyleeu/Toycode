import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addToCartUnsafe } from '../actions/cart'
import { getAddedCart } from '../reducers/cart'
import {ProductsList, ProductItem} from '../components'




class ProductsContainer extends Component{
  render(){
    const { books, selected, addToCartUnsafe, customType } = this.props;
    return(
      <ProductsList title="1단계: 주문하실 교재를 선택하세요.">
        <div className="goods-list">
          {books.map((book, i) =>
            <ProductItem
              key={i}
              book={book}
              onAddToCartClicked={() => {
                selected.map((Id) => Id.id).indexOf(book.code) === -1 &&
                  addToCartUnsafe(book, customType === "A" ? book.bPrice : book.dPrice)
              }}
            />
          )}
        </div>
      </ProductsList>
    )
  }
}


const mapStateToProps = (state) => ({
  books: state.shop.products,
  selected: getAddedCart(state),
  customType: state.auth.user.customerType
})

export default connect(mapStateToProps, { addToCartUnsafe })(ProductsContainer)
