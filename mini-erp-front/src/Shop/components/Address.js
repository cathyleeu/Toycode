import React, {Component} from 'react'
import Input from './Input'


class Address extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rqcontent: ''
    }
  }
  handleChange = e => {
    this.setState({rqcontent:e.target.value})
  }
  render(){
    const {user, userEmail, userCode, requestInvoice, selected} = this.props
    // debugger
    const invoice = {
      //TODO: user 정보 더 받아오기 user.email 식으로 기존 내용 다양하게 정리
      userEmail: userEmail,
      userCode: userCode,
      delivery: {
        to: user.Name,
        address: user.Address,
        phone: "010-999"
      },
      requestedGoods: selected.map(each => (
        { name : each.title,
          qutt: each.amount,
          sales: each.amount*each.price
        })),
      requestDesc: this.state.rqcontent,
      totalSales: selected.map(each => each.amount*each.price).reduce((a,b)=>a+b)
    }
    return(
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6">
            <label>우편번호</label>
            <Input type={'number'} placeholder={'우편번호'} className={'Added-Input'}/>
          </div>
          <Input type={'submit'} value={'주소검색'} className={'col-md-4 form-control'}/>
        </div>
        <label>배송지</label>
        <Input type={'text'} value={user.Address} placeholder={'배송지'} className={'Added-Input'}/>
        <div className="row">
          <div className="col-md-6">
            <label>수령인</label>
            <Input type={'text'} value={user.Name} placeholder={'받는이'} className={'Added-Input'}/>
          </div>
          <div className="col-md-6">
            <label>연락처</label>
            <Input type={'text'} value={invoice.delivery.phone} placeholder={'전화번호'} className={'Added-Input'}/>
          </div>
        </div>

        <label>배송메모</label>
        <textarea
          rows="2" name='rqcontent' placeholder='배송 요청사항을 적어주세요.'
          value={this.state.rqcontent} onChange={this.handleChange}
          className="form-control"></textarea>
        <button
          className="btn btn-success col-md-3"
          onClick={() => requestInvoice(invoice)}>주문하기</button>
      </div>
    )
  }
}
export default Address
