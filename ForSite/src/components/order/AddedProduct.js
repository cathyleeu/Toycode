import React, { Component, PropTypes } from 'react'
import Input from './Input'

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
  isOnBlur = () => {
    const {goodsSelect} = this.props
    goodsSelect(this.props.id, parseInt(this.state.orderQuantity))
  }
  render(){
    return(
      <div className="row">
        <div className="col-md-4"><p>{this.props.title} - {this.props.price}원</p></div>
        <div className="col-md-6">
          <Input
            type={'number'}
            value={this.state.orderQuantity}
            onChange={this.handleChange}
            placeholder={'주문수량'}
            onBlur={this.isOnBlur}
          />
        </div>
        {/* TODO: 삭제 버튼 눌렀을 때, state가 같이 삭제 되어야함.  */}
        <button
          className="col-md-2 btn btn-danger"
          onClick={() => {
          this.props.goodsDelete(this.props.id)
        }}>삭제</button>
      </div>
    )
  }
}



export default AddedProduct
