import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getTotal, getCartProducts } from '../../reducers'
import { addToCart } from '../../actions/order'
import Cart from './Cart'
import CartList from './CartList'
// import AddedProduct from './AddedProduct'


class OrderForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
    orderQuantity: 0,
    seletedId:''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    this.setState({
      orderQuantity: e.target.value,
      selectedId: e.target.name
    }, () => console.log(parseInt(this.state.selectedId), parseInt(this.state.orderQuantity)))
  }
  render(){
    const props = this.props
    return(
        <Cart
          books={props.books}
          qutt={this.state.orderQuantity}
          controlFunc={this.handleChange}
          selectedId={this.state.selectedId}
          // total={total}
          // amount={props.amount}
          // onAddToOrder={() => { addToOrder(books.id, this.state.orderQuantity)}}
         />
    )
  }
}

// const OrderForm = ({ books, total, amount }) => (
//   <Cart
//     books={books}
//     // total={total}
//     amount={amount}
//     onAddToOrder={() => { addToOrder(books.id)}}
//    />
//
// )


// {books !== undefined ? books.map(book =>
//   <CartList
//     key={book.id}
//     book={book}
//     amount={amount}
//     onAddToOrder={() => { addToOrder(book.id) }}
//
//   />
// ): <div>상품을 담아주세요!</div>}



function mapStateToProps(state){
  return {
    books: getCartProducts(state),
    // total: getTotal(state),
    amount: state
    // TODO: total도 뿌려줘야함.
  }
}

export default connect(mapStateToProps, {addToCart})(OrderForm)
