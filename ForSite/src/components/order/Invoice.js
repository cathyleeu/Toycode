import React from 'react'
import Address from './Address'

const Invoice = ({nodes,total,requestInvoice,user,selected}) => (
  <div className="row">
    <div className="col-md-3">
      <h3>주문서</h3>
    </div>
    <div className="col-md-9">
      <div className="col-md-12">{nodes}<hr /></div>

      <div className="row col-md-12">
        <div className="col-md-8"></div>
        <p className="col-md-4">총 가격:{total}</p>
      </div>
      <Address
        requestInvoice={requestInvoice}
        userEmail={user.email}
        userCode={user.user.Code}
        user={user.user.branch}
        selected={selected}
      />
    </div>
  </div>
)


export default Invoice
