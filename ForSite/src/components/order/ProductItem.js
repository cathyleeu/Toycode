import React, { Component, PropTypes } from 'react'
import Product from './Product'


class ProductItem extends Component {
  constructor(props, {initialValue}) {
    super(props, {initialValue})
    this.state = {
      orderValue : initialValue
    }
    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e){
    const newState = e.target.value
    this.setState({ orderValue: newState })
    this.props.callbackParent(newState)
  }

  render(){
    var order_num = []
    const book = this.props.book
    for(let i=1; i < book.quantity+1; i++){order_num.push(i)}
    order_num = order_num.map(i => <option key={i} value={i}>{i}</option>)
    return(
      <div>
        <Product
          title={book.title}
          price={book.price}
          img={book.img}
        />
        <div className="quantity">
          <select
            value={this.state.orderValue}
            onChange={this.handleChange}>
            {order_num}
          </select>
          <input
            type="submit"
            disabled={book.quantity > 0 ? '' : 'disabled'}
            onClick={this.props.onAddToCartClicked}
            value = {book.quantity > 0 ? '장바구니': '매진'} />
        </div>
      </div>
    )
  }
}


export default ProductItem
