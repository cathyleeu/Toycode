import React, { Component, PropTypes } from 'react'
import QuantityInput from './QuantityInput'

//
// class AddedProduct extends Component {
//   constructor(props) {
//     super(props)
//     this.state={
//       orderQuantity: 0
//     }
//     this.handleChange = this.handleChange.bind(this)
//   }
//   handleChange(e){
//     this.setState({orderQuantity: e.target.value})
//   }
//   render(){
//     return(
//       <div className="orderList">
//         <p>{this.props.title} - {this.props.price}원</p>
//         <QuantityInput
//           type={'number'}
//           name={'주문수량'}
//           qutt={this.state.orderQuantity}
//           placeholder={'주문수량'}
//           controlFunc={this.handleChange}
//         />
//         <button>삭제</button>
//       </div>
//     )
//   }
// }


//
//
const AddedProduct = ({id,price, title, eachTotal, onAddToOrder, qutt, controlFunc}) => {

return  (
    <div className="orderList">
      <p>{title} - {price}원</p>
      <QuantityInput
        type={'number'}
        name={id}
        qutt={qutt}
        placeholder={'주문수량'}
        controlFunc={controlFunc}
      />
    </div>
  )
}

export default AddedProduct
