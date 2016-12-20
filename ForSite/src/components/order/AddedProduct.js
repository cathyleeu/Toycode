import React, { Component, PropTypes } from 'react'
import QuantityInput from './QuantityInput'

//
class AddedProduct extends Component {
  constructor(props) {
    super(props)
    this.state={
      orderQuantity: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    this.setState({orderQuantity: e.target.value})
  }
  render(){
    return(
      <div className="orderList">
        <p>{this.props.title} - {this.props.price}원</p>
        <QuantityInput
          type={'number'}
          name={this.props.name}
          value={this.state.orderQuantity}
          onChange={this.handleChange}
          placeholder={'주문수량'}
        />
        <button
          onClick={() => {
            this.props.toggleSelect(
              this.props.title,
              this.props.name,
              this.state.orderQuantity,
              this.props.price
            )
          }}>
          추가</button>
        <button>삭제</button>
      </div>
    )
  }
}


//
//
// const AddedProduct = ({ toggleSelect,id ,price, title, eachTotal, onAddToOrder, qutt, controlFunc, requestInvoice}) => {
//   const value = qutt
//   return  (
//       <div className="orderList">
//         <div
//           onClick={toggleSelect}>
//           <QuantityInput
//             type={'checkbox'}
//             // checked={toggleSelect}
//             // onClick={toggleSelect}
//           />
//         </div>
//         <p>{title} - {price}원</p>
//         <QuantityInput
//           type={'number'}
//           name={id}
//           value={qutt}
//           placeholder={'주문수량'}
//           current={qutt}
//           controlFunc={controlFunc}
//         />
//         <button >delete</button>
//       </div>
//     )
// }


export default AddedProduct
