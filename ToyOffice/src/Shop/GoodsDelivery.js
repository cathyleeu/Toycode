import React, {PureComponent} from 'react'
import GoodsDeliveryAddr from './GoodsDeliveryAddr'
import { Commas } from '../CommonFunc'

class GoodsDelivery extends PureComponent{
  renderStatement = (state, i) => (
    <tr className="Delivery-Statement-Detail" key={i}>
      <td className="lang">{state.title}{state.level}{state.volume}</td>
      <td className="title">{state.amount}</td>
      <td className="title">{Commas(state.dPrice)}</td>
      <td className="title">60%</td>
      <td className="level">{Commas(state.dPrice*state.amount*0.6)}</td>
    </tr>
  )
  render(){
    let total = 0;
    this.props.goodsInCart.forEach(p => total += (p.dPrice*p.amount))
    return(
      <div className="Goods-Delivery">
        <div className="Goods-Delivery-Statement">
          <p className="Goods-Delivery-Title">키즈씽킹 주문내역</p>
          <table className="Delivery-Statement-List">
            <thead>
              <tr className="Delivery-Statement-Item">
                <th className="lang">상품명</th>
                <th className="title">수량</th>
                <th className="title">단가</th>
                <th className="title">공급률</th>
                <th className="title">가격</th>
              </tr>
            </thead>
            <tbody>
              {this.props.goodsInCart.map(this.renderStatement)}
            </tbody>
          </table>
          <div className="Delivery-Statement-Bill">
            <p className="Delivery-Statement-Fixed">{Commas(total)}원</p>
            <div className="Delivery-Statement-Col">
              <p className="Delivery-Statement-Total">Total</p>
              <div className="Delivery-Statement-Row">
                <p className="Delivery-Statement-Sales">{Commas(total*0.6)}원</p>
                <p className="Delivery-Statement-Sales-Per">(공급률 60%)</p>
              </div>
            </div>
          </div>
        </div>
        <GoodsDeliveryAddr />
      </div>
    )
  }
}

export default GoodsDelivery
