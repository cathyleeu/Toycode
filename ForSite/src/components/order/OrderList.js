import React, { Component, propTypes } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
// import { addtocart } from './actions'
import { addToCart, addToCartUnsafe } from '../../actions/order'
import { getVisibleProducts } from '../../reducers/products'
// import * as actions from './actions'
// import ProductItem from './ProductItem'
import ProductsList from './ProductsList'
import ProductItem from './ProductItem'

//
class OrderList extends Component{
  constructor(props) {
    super(props)
    this.state = {
      orderValue: 0
    }
  }
  onChildChanged(newState){
    this.setState({ orderValue: newState })
    console.log('OrderList:',this.state.orderValue);
  }
  render(){
    const books = this.props.books
    return(
      <ProductsList title="키즈코딩 교재">
        {books.map(book =>
          <ProductItem
            key={book.id}
            book={book}
            initialValue={this.state.orderValue}
            callbackParent={(newState) => this.onChildChanged(newState) }
            // onAddToCartClicked={() => addtocart(book.id)}
            onAddToCartClicked={() => {
              this.props.addToCart(book.id, parseInt(this.state.orderValue))
              // addToCart(book.id, this.state.orderValue)
              // addToCartUnsafe(this)
            }}
          />
        )}
      </ProductsList>
    )
  }
}






function mapStateToProps(state){
  return {
    books: state.books
  }
}

export default connect(mapStateToProps, { addToCart, addToCartUnsafe })(OrderList)
