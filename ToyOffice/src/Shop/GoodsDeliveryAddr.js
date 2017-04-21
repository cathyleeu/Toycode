import React, {Component} from 'react'

class GoodsDeliveryAddr extends Component{
  state = {
    rqcontent: '',
	// 	location: '',
    phone: '',//acct.A_phone || '',
		zipNo: '',
		roadAddr: '', //address.roadAddr|| '',
		detailAddr: '',//address.detailAddr|| '',
    recipient: '' //acct.A_manager || '',
  }
  render(){
    return(
      <div className="Goods-Delivery-Addr">
        <div className="Delivery-Addr-Col">
          <div className="Delivery-Addr-Row SpaceBtw">
            <label>
            우편번호
            <input
              className="Delivery-input"
              placeholder='우편번호'
              type='number'
              name="zipNo"
              value={this.state.zipNo}
              readOnly/>
            </label>
            <button className="Delivery-Addr-btn">주소 검색</button>
            <button className="Delivery-Addr-btn">주소록</button>
          </div>
          <div>
            <label>배송처
            <input
              className="Delivery-input"
              placeholder='배송지'
              type='text'
              name="roadAddr"
              value={this.state.roadAddr}
            />
            </label>
            <label>배송지 상세주소
            <input
              className="Delivery-input"
              placeholder='배송지 상세주소'
              type='text'
              name="detailAddr"
              value={this.state.detailAddr}
            />
            </label>
          </div>
          <div className="Delivery-Addr-Row SpaceBtw">
            <label>
              수령인
            <input
              className="Delivery-input half"
              placeholder='수령인'
              type='text'
              name="recipient"
              value={this.state.recipient}
            />
            </label>
            <label>연락처
            <input
              className="Delivery-input"
              placeholder='연락처'
              type='text'
              name="phone"
              value={this.state.phone}
            />
            </label>
          </div>
          <div>
            <label>
              요구사항
            <input
              className="Delivery-input"
              placeholder='요구사항'
              type='text'
              name="rqcontent"
              value={this.state.rqcontent}
            />
            </label>
          </div>
        </div>
      </div>
    )
  }
}

export default GoodsDeliveryAddr
