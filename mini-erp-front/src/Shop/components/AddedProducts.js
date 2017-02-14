import React, { Component } from 'react'
import Input from './Input'
import './AddedProducts.css'

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
    goodsSelect(this.props.id, parseInt(this.state.orderQuantity, 10))
  }
  render(){
    const {title, goodsDelete, id} = this.props;
    return(
      <div className="Added">
        <div className="col-md-3">
          <p>{title}</p>
        </div>
        <Input
          type={'number'}
          className={'col-md-6 Added-Input'}
          value={this.state.orderQuantity}
          onChange={this.handleChange}
          placeholder={'주문수량'}
          onBlur={this.isOnBlur}
        />
        <button
          className="col-md-2"
          onClick={() => { goodsDelete(id) }}>삭제</button>
      </div>
    )
  }
}



export default AddedProduct
