import React, {PureComponent} from 'react'
import Address from './Address'
import SelectedGoods from './SelectedGoods'
import './Invoice.css'

function Commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


class Invoice extends PureComponent{
  isSelectedGoods = (detail, i) => <SelectedGoods detail={detail} key={i}/>
  render(){
    const commaTotal = Commas(this.props.total)
    const { branch, email, code, account, kinders, customerType, erpCode } = this.props.user.user;
    return(
      <div className="Invoice-Container">
        <div className="col-md-6">
          <div className="selected-goods">
            {this.props.nodes}
          </div>
          <div className="selected-goods-detailed">
            <p>상세 내역</p>
            {this.props.selected.map(this.isSelectedGoods)}
          </div>
          <div className="Invoice-Total"><p>총 가격:</p><p className="Invoice-Total-Price">{commaTotal}</p><p>원</p></div>
        </div>
        <div className="col-md-6">
          <Address
            {...this.props}
            userName={branch.name}
            userEmail={email}
            userCode={code}
            user={branch}
            customerType={customerType}
            address={branch.address}
            acct={account}
            userErp={erpCode}
            userKinders={kinders}
          />
        </div>
      </div>
    )
  }
}


export default Invoice
