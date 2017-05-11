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
  renderModiItems = (item, i) => <OrderModiItem {...item} key={i} isDeleteGoods={this.props.isDeleteGoods} isModiGoodsQutt={this.props.isModiGoodsQutt}/>
  handleModiBtn = (e, name) => {
    let {modiGoods, item } = this.props, {userCode, invoiceId} = item;
    e.preventDefault()
    if(name === 'modi'){
      if(confirm('주문 수정 완료 하시겠습니까?')){
        this.props.isRequestModi( userCode, invoiceId, modiGoods)
        alert('주문 수정이 완료되었습니다.')
      } else {
        alert('주문 수정이 취소되었습니다. ')
      }
    } else if (name === 'cancle') {
      if(confirm('주문 수정 취소 하시겠습니까?')){
        this.props.isCancleModi()
        alert('주문 수정이 완료되었습니다.')
      }
    } else {
      if(confirm('주문을 전체 취소 하시겠습니까?')){
        this.props.isCancleAll(userCode, invoiceId)
        alert('전체 주문 취소 완료되었습니다.')
      } else {
        alert('취소 되었습니다.')
      }
    }
    this.props.closeModal()
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
