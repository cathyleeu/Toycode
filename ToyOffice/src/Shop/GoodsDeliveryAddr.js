import React, {Component} from 'react'
import {TextField, RaisedButton} from 'material-ui';

class GoodsDeliveryAddr extends Component{
  state = {
  //   rqcontent: '',
	// 	location: '',
  //   phone: acct.A_phone || '',
		zipNo: '',
	// 	roadAddr: address.roadAddr|| '',
	// 	detailAddr: address.detailAddr|| '',
  //   recipient: acct.A_manager || '',
  }
  render(){
    return(
      <div className="Goods_Delivery_Addr">
        <div className="Delivery-Addr-Row">
          <TextField
            hintText="주소검색으로 우편번호 선택하세요"
            // floatingLabelText="우편번호"
            type="zipNo"
            name="zipNo"
            value={this.state.zipNo}
            disabled={true}
            // onChange={this.handleChange}
            // errorText={this.state.err}
          />
          <RaisedButton label="검색"/>
          <RaisedButton label="주소록"/>
        </div>
      </div>
    )
  }
}

export default GoodsDeliveryAddr
