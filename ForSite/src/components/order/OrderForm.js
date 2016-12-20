import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getTotal, getCartProducts } from '../../reducers'
import { requestInvoice, requestQuantity, toggleSelect } from '../../actions/order'
import Cart from './Cart'
import {bindActionCreators} from 'redux'

// import AddedProduct from './AddedProduct'


class OrderForm extends Component {
  constructor(props) {
    super(props)
    this.state = {

    seletedId: undefined
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    this.setState({
      selectedId: e.target.name
    }, () => console.log(parseInt(this.state.orderQuantity)))
  }
  //this.props.requestQuantity(parseInt(this.state.selectedId),parseInt(this.state.orderQuantity))
  render(){
    const props = this.props
    return(
        <Cart
          books={props.books}
          qutt={this.state.orderQuantity}
          // controlFunc={this.handleChange}
          selectedId={this.state.selectedId}
          requestInvoice={() => { props.requestInvoice(parseInt(this.state.selectedId), parseInt(this.state.orderQuantity))}}
          toggleSelect={props.toggleSelect}
          
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
    selected: getAddedCart(state)
    // total: getTotal(state),
    // TODO: total도 뿌려줘야함.
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    toggleSelect:toggleSelect,
    requestQuantity:requestQuantity,
    requestInvoice:requestInvoice
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)
