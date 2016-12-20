import React, { Component, PropTypes } from 'react'
import AddedProduct from './AddedProduct'


// class Cart extends Component {
//   constructor(props) {
//     super(props)
//   }
//   render(){
//     const nodes = this.props.books !== undefined ? (
//           this.props.books.map(book =>
//             <AddedProduct
//               title={book.title}
//               price={book.price}
//               key={book.id}
//               name={book.id}
//               // controlFunc={this.props.controlFunc}
//               qutt={this.props.qutt}
//               toggleSelect={this.props.toggleSelect}
//               onAddToOrder={this.props.onAddToOrder}
//             />
//           )
//         ) : (
//           <em> 상품을 담아주세요. </em>
//         )
//     return(
//       <div>
//         <h3>주문서</h3>
//         <div>{nodes}</div>
//         {/* <div>{checkout}</div> */}
//         <hr />
//
//         {/* <p>총 가격: {total}</p> */}
//       </div>
//     )
//   }
// }

// !== undefined
const Cart = ({books, selected, toggleSelect}) => {
  const nodes = books.length > 0 ? (
      books.map(book =>
        <AddedProduct
          title={book.title}
          price={book.price}
          key={book.id}
          id={book.id}
          toggleSelect={toggleSelect}
        />
      )
    ) : (
      <em> 상품을 담아주세요. </em>
    )
  const each = selected.length > 0 ? (
    selected.map(each => (
      <div key={each.id} value={each.total}>
        <p>{each.title} : {each.total}</p>
      </div>
    ))
  ): <em> 총가격 </em>
  var all = []
  const total = selected.length > 0 ? (
    selected.map(each => {
      all.push(each.total)
    })
  ) : false
  const allTotal = all.length > 0 ? all.reduce((a,b) => a+b) : false
  return (
    <div>
      <h3>주문서</h3>
      <div>{nodes}</div>
      <hr />

      <div>{each}</div>
      <div>{allTotal}</div>
    </div>
  )
}

export default Cart
