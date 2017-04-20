import React, {PureComponent} from 'react'
import AddedProducts from './AddedProducts'
import Invoice from './Invoice'
import './Cart.css'


class Cart extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      books: props.books
    }
  }
  componentWillReceiveProps(newProps){
    if(this.state.books !== newProps.books){
      console.log(this.state.books);
      console.log(newProps.books);
      this.setState({books: newProps.books})
    }
  }
  isDelete = (id) => {
    console.log("Cart",id)
    this.props.goodsDelete(id)
  }
  render(){
    const { selected } = this.props;
    const nodes = this.state.books.map((book, i) =>
          <AddedProducts
            key={book.id}
            book={book}
            isDelete={this.isDelete}
            {...this.props}
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
          nodes={nodes}
          total={total}
          {...this.props}
        />
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
