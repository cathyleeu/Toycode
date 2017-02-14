import React from 'react'
import Address from './Address'
import './Invoice.css'

function Commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Invoice = ({nodes,total,requestInvoice,user,selected, kinderAddr}) => {
  const commaTotal = Commas(total)
  const { branch, email, code, account, kinders} = user.user;
  return(
  <div className="Invoice-Container">
    <div className="col-md-6">
      {nodes}
      <div className="col-md-12 Invoice-Total"><p>총 가격:</p><p className="Invoice-Total-Price">{commaTotal}</p><p>원</p></div>
    </div>
    <div className="col-md-6">
      <Address
        requestInvoice={requestInvoice}
        userName={branch.name}
        userEmail={email}
        userCode={code}
        user={branch}
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
