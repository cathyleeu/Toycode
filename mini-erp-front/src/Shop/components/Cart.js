import React, {Component} from 'react'
import AddedProducts from './AddedProducts'
import Invoice from './Invoice'
import './Cart.css'


class Cart extends Component {
  componentWillMount(){
    const {getInvoices} = this.props
    getInvoices()
  }
  render(){
    const {books, selected, goodsSelect, goodsDelete, requestInvoice, user, kinderAddr} = this.props;
    const nodes = books.map((book, index) =>
          <AddedProducts
            key={index}
            title={book.title}
            id={book.id}
            goodsSelect={goodsSelect}
            goodsDelete={goodsDelete}
          />
        )
    const total = selected.reduce((sum, each) => (sum + each.price * each.amount), 0);
    const emptyCart = (
      <div>
        <h4 className="Cart-Title">2단계: 수량 및 배송정보를 입력하세요.</h4>
        <div className="Empty-Container">
          <p className="Empty-alert"> 1단계에서 상품을 먼저 선택해 주세요.</p>
          <p> 상품을 클릭하시면, 해당 상품의 주문서가 생성됩니다.</p>
          <p> (A와B단계 교재를 선택하시면 A/B단계 교재 주문서가 생성됩니다.)</p>
        </div>
      </div>
    )
    const selectedCart = (
      <div>
        <h4 className="Cart-Title">2단계: 수량 및 배송정보를 입력하세요.</h4>
        <Invoice
          kinderAddr={kinderAddr}
          nodes={nodes}
          total={total}
          requestInvoice={requestInvoice}
          user={user}
          selected={selected} />
      </div>
    )
    return(
      <div className="Container">
        { nodes.length === 0 ? emptyCart : selectedCart }
      </div>
    )
  }
}

export default Cart
