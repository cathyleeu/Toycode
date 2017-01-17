import React from 'react'
import Address from './Address'
import './Invoice.css'

const Invoice = ({nodes,total,requestInvoice,user,selected}) => (
  <div className="Invoice-Container">
    <div className="col-md-6">
      {nodes}
      <div className="col-md-12 Invoice-Total"><p>총 가격:</p><p className="Invoice-Total-Price">{total}</p><p>원</p></div>
    </div>
    <div className="col-md-6">
      <Address
        requestInvoice={requestInvoice}
        userEmail={user.user.email}
        userCode={user.user.Code}
        user={user.user.branch}
        selected={selected}
      />
    </div>
  </div>
)


export default Invoice
