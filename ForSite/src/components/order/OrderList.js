import React, { Component, propTypes } from 'react'
import { connect } from 'react-redux'
import { addToCartUnsafe } from '../../actions/order'
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
  // onChildChanged(newState){
  //   this.setState({ orderValue: newState })
  //   console.log('OrderList:',this.state.orderValue);
  // }
  render(){
    const books = this.props.books
    return(
      <ProductsList title="키즈코딩 교재">
        {books.map(book =>
          <ProductItem
            key={book.id}
            book={book}
            // initialValue={this.state.orderValue}
            callbackParent={(newState) => this.onChildChanged(newState) }
            onAddToCartClicked={() => {
              this.props.addToCartUnsafe(book.id, book.title, book.price)
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

export default connect(mapStateToProps, { addToCartUnsafe })(OrderList)
