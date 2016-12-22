import React, {Component} from 'react'



class Address extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rqcontent: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    this.setState({rqcontent:e.target.value})
  }
  render(){
    const invoice = {
      //TODO: user 정보 더 받아오기 user.email 식으로 기존 내용 다양하게 정리
      orderId: 1,
      userEmail: 'leelee',
      delivery: {
        to: '이유경',
        address: "강남",
        phone: "010-999"
      },
      // TODO: 500 error 문제해결
      requestedGoods: this.props.selected.map(each => (
        { name : each.title, qutt: parseInt(each.amount) })),
      requestDesc: this.state.rqcontent
    }
    return(
      <div>
        <label>배송지</label><input type="type" value={invoice.delivery.address}/>
        <label>수령인</label><input type="type" value={invoice.delivery.to}/>
        <label>연락처</label><input type="type" value={invoice.delivery.phone}/>
        <label>배송메모</label><textarea rows="2" name='rqcontent' placeholder='배송 요청사항을 적어주세요.' value={this.state.rqcontent} onChange={this.handleChange}></textarea>
        <button
          onClick={() => this.props.requestInvoice(invoice)}>주문하기</button>
      </div>
    )
  }
}
export default Address
