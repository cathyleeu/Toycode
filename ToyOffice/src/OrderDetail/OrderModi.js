import React, {PureComponent} from 'react'
import OrderModiItem from './OrderModiItem'

class OrderModi extends PureComponent {
  state = {
    modiGoods: this.props.modiGoods
  }
  componentWillReceiveProps(newProps){
    if(newProps.modiGoods !== this.props.modiGoods)
    this.setState({modiGoods: newProps.modiGoods})
  }
  componentWillMount(){
    let { item, isOpenModiModal } = this.props;
    isOpenModiModal(item.requestedGoods)
  }
  renderModiItems = (item, i) => <OrderModiItem {...item} key={i} isDeleteGoods={this.props.isDeleteGoods} isModiGoodsQutt={this.props.isModiGoodsQutt}/>
  handleModiBtn = (e, name) => {
    console.log("handleModiBtn",name, this.props);
    let {modiGoods, item } = this.props, {userCode, invoiceId} = item;
    e.preventDefault()
    if(name === 'modi'){
      this.props.isRequestModi( userCode, invoiceId, modiGoods)
    } else if (name === 'cancle') {
      this.props.isCancleModi()
    } else {
      this.props.isCancleAll(userCode, invoiceId)
    }
  }
  render(){
    let { modiGoods } = this.props;
    return(
      <div>
        <p>주문 수정하기</p>
        <table>
          <thead>
            <tr>
              <th>상품명</th>
              <th>수량</th>
              <th>가격</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {modiGoods.map(this.renderModiItems)}
          </tbody>
        </table>
        <button onClick={() => this.handleModiBtn(event,'modi')}>수정 완료</button>
        <button onClick={() => this.handleModiBtn(event,'cancle')}>취소하기</button>
        <button onClick={() => this.handleModiBtn(event,'total')}>전체 주문 취소</button>
      </div>
    )
  }
}

export default OrderModi
