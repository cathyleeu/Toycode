import React, { Component, PropTypes } from 'react'
import QuantityInput from './QuantityInput'

//
class AddedProduct extends Component {
  constructor(props) {
    super(props)
    this.state={
      orderQuantity: this.props.value || ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    this.setState({orderQuantity: e.target.value},
    () => this.props.toggleSelect(this.props.id, this.state.orderQuantity))
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
        <button>삭제</button>
      </div>
    )
  }
}



export default AddedProduct
