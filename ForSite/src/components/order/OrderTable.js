import React, {Component} from 'react'
import OrderForm from './OrderForm'
import OrderList from './OrderList'

class OrderTable extends Component{
  render() {
    return (
      <div>
        <OrderList />
        <OrderForm />
      </div>
    )
  }
}

export default OrderTable
