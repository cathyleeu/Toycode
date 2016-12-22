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
    this.setState({orderQuantity: e.target.value},
    () => this.props.goodsSelect(this.props.id, this.state.orderQuantity))
  }
  render(){
    return(
      <div>
        <p>{this.props.title} - {this.props.price}원</p>
        <QuantityInput
          type={'number'}
          value={this.state.orderQuantity}
          onChange={this.handleChange}
          placeholder={'주문수량'}
        />
        {/* TODO: 삭제 버튼 눌렀을 때, state가 같이 삭제 되어야함.  */}
        <button onClick={() => {
          this.props.goodsDelete(this.props.id)
        }}>삭제</button>
      </div>
    )
  }
}



export default AddedProduct
