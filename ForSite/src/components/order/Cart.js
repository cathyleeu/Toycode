import React, { Component, PropTypes } from 'react'
import AddedProduct from './AddedProduct'


class Cart extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    const nodes = this.props.books !== undefined ? (
          this.props.books.map(book =>
            <AddedProduct
              title={book.title}
              price={book.price}
              key={book.id}
              name={book.id}
              controlFunc={this.props.controlFunc}
              qutt={this.props.qutt}
              toggleSelect={this.props.toggleSelect}
              onAddToOrder={this.props.onAddToOrder}
            />
          )
        ) : (
          <em> 상품을 담아주세요. </em>
        )
    return(
      <div>
        <h3>주문서</h3>
        <div>{nodes}</div>
        {/* <div>{checkout}</div> */}
        <hr />

        {/* <p>총 가격: {total}</p> */}
      </div>
    )
  }
}


// const Cart = (props) => {
//   const {books, amount, onAddToOrder,controlFunc, qutt, requestInvoice, toggleSelect} = props
//   const nodes = books !== undefined ? (
//       books.map(book =>
//         <AddedProduct
//           title={book.title}
//           price={book.price}
//           key={book.id}
//           id={book.id}
//           controlFunc={controlFunc}
//           qutt={qutt}
//           toggleSelect={toggleSelect}
//           onAddToOrder={onAddToOrder}
//         />
//       )
//     ) : (
//       <em> 상품을 담아주세요. </em>
//     )
//   const checkout = nodes.length > 0 ? (
//     <div>
//       <button
//         onClick={requestInvoice}>주문하기</button>
//     </div>
//   ): false
//   return (
//     <div>
//       <h3>주문서</h3>
//       <div>{nodes}</div>
//       <div>{checkout}</div>
//       <hr />
//
//       {/* <p>총 가격: {total}</p> */}
//     </div>
//   )
// }

export default Cart
