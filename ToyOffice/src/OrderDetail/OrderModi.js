import React, {PureComponent} from 'react'
import OrderModiItem from './OrderModiItem'

class OrderModi extends PureComponent {
  renderModiItems = (item, i) => <OrderModiItem {...item} key={i}/>
  render(){
    let { item } = this.props;
    return(
      <div>
        <p>주문 수정하기</p>
        {item.requestedGoods.map(this.renderModiItems)}
      </div>
    )
  }
}

export default OrderModi
