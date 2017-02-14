import React from 'react'
import Address from './Address'
import './Invoice.css'

function Commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Invoice = ({ nodes, total, requestInvoice, user, selected, kinderAddr }) => {
  const commaTotal = Commas(total)
  const { branch, email, code, account, kinders, customerType } = user.user;
  return(
  <div className="Invoice-Container">
    <div className="col-md-6">
      <div className="selected-goods">
        {nodes}
      </div>
      <div className="selected-goods-detailed">
        <p>상세 내역</p>
        {selected.map((detail,i) => (
          <div key={i} className="selected-goods-detailed-ctx">
            {detail.amount && <div> {detail.title} X {detail.amount} = {detail.amount*detail.price}원 </div>}
          </div>
        ))}
      </div>
      <div className="Invoice-Total"><p>총 가격:</p><p className="Invoice-Total-Price">{commaTotal}</p><p>원</p></div>
    </div>
    <div className="col-md-6">
      <Address
        requestInvoice={requestInvoice}
        userName={branch.name}
        userEmail={email}
        userCode={code}
        user={branch}
        customerType={customerType}
        address={branch.address}
        acct={account}
        selected={selected}
        userKinders={kinders}
        kinderAddr={kinderAddr}
      />
    </div>
  </div>
)}


export default Invoice
