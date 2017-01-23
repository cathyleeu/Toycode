import React, {Component} from 'react'
import Input from './Input'
import './Address.css'
import AddressSearch from './AddressSearch'
import { connect } from 'react-redux'
import * as actions from '../../actions'


// overwrite style
const modalStyle = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0,0.5)'
	}
};


class Address extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rqcontent: '',
			location: '',
			zipNo: '',
			address: this.props.user.Address,
			detailAddr: '',
      isModalOpen: false
    }
  }
  handleChange = e => {
    this.setState({[e.target.name]:e.target.value})
  }
  openModal = () => {
    this.setState({ isModalOpen: true })
  }
  closeModal = () => {
		const { searchAddress } = this.props
		this.setState({ isModalOpen: false, location: ''}, searchAddress(''))
	}
	isSearchAddress = () => {
		const { searchAddress } = this.props
		searchAddress(this.state.location)
	}
	isSelectedAddress = (result) => {
		const {selectedJuso} = this.props
		selectedJuso(result)
		this.closeModal()
		this.setState({
			zipNo: result.zipNo,
			address: result.roadAddr
		})
	}
  render(){
    const {user, userEmail, userCode, requestInvoice, selected, juso} = this.props
    // debugger
    const invoice = {
      /*TODO
        1: 사용자가 주소입력 할 수 있도록 onChange설정하기
        2: 그래도, 처음에는 (회원가입)입력한 값으로 받기
        3: 주소 검색 API 붙이기
        4: UI 정리하기...ㅠㅠ
      */
      userEmail: userEmail,
      userCode: userCode,
      delivery: {
        to: user.Name,
        address: this.state.address,
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
      <div className="col-md-12 delivery">
        <div className="delivery-zipcode">
          <label>우편번호</label>
          <div className="zipcode">
            <Input type={'text'} placeholder={'우편번호'} className={'col-md-5 Added-Input'} value={this.state.zipNo}/>
            <button onClick={this.openModal} className="col-md-2">주소검색</button>
            <AddressSearch
              isModalOpen={this.state.isModalOpen}
              closeModal={this.closeModal}
              style={modalStyle}>
							<div>
								<i className="fa fa-times-circle" aria-hidden="true" onClick={this.closeModal}>close</i>
							</div>
							<div>
								<input type="search" value={this.state.location} onChange={this.handleChange} name="location"/>
								<i className="fa fa-search" aria-hidden="true" onClick={this.isSearchAddress}></i>
							</div>
							<div>
								{juso && juso.map((result, i)=> (
									<div key={i} onClick={() => this.isSelectedAddress(result)}>
										<p>{result.roadAddr}</p>
									</div>
								))}
							</div>

            </AddressSearch>
          </div>
        </div>
        <div className="delivery-address">
          <label>배송지</label>
          <Input type={'text'} value={this.state.address} placeholder={'배송지'} className={'Added-Input'}/>
					<Input type={'text'} value={this.state.detailAddr} placeholder={'상세주소를 입력해주세요.'} className={'Added-Input'} onChange={this.handleChange} name={'detailAddr'}/>
        </div>
        <div className="delivery-recipient">
          <div className="name">
            <label>수령인</label>
            <Input type={'text'} value={user.Name} placeholder={'받는이'} className={'Added-Input'}/>
          </div>
          <div className="phone">
            <label>연락처</label>
            <Input type={'text'} value={invoice.delivery.phone} placeholder={'전화번호'} className={'Added-Input'}/>
          </div>
        </div>
        <div className="delivery-inquiry">
          <label>요청사항</label>
          <textarea
            rows="2" name='rqcontent' placeholder='배송 요청사항을 적어주세요.' name="rqcontent"
            value={this.state.rqcontent} onChange={this.handleChange} />
        </div>
        {invoice.totalSales ?(
          <button
            className="col-md-3"
            onClick={() => requestInvoice(invoice)}>주문하기</button>
        ):'수량을 입력하시면 주문하기 버튼이 뜹니다.'}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    juso: state.commonData.juso,
		selectedJuso: state.commonData.selectedJuso
  }
}


export default connect(mapStateToProps,actions)(Address)
// export default Address
