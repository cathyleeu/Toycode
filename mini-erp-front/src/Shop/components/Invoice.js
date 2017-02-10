import React from 'react'
import Address from './Address'
import './Invoice.css'

function Commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Invoice = ({nodes,total,requestInvoice,user,selected, kinderAddr}) => {
  const commaTotal = Commas(total)
  return(
  <div className="Invoice-Container">
    <div className="col-md-6">
      {nodes}
      <div className="col-md-12 Invoice-Total"><p>총 가격:</p><p className="Invoice-Total-Price">{commaTotal}</p><p>원</p></div>
    </div>
    <div className="col-md-6">
      <Address
        requestInvoice={requestInvoice}
        userName={user.user.branch.Name}
        userEmail={user.user.email}
        userCode={user.user.Code}
        user={user.user.branch}
        address={user.user.branch.Address}
        acct={user.user.account}
        selected={selected}
        userKinders={user.user.kinders}
        kinderAddr={kinderAddr}
      />
    </div>
  </div>
)}


export default Invoice
