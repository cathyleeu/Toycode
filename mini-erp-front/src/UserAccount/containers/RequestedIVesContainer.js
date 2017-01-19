import React from 'react';
import RequestedIVes from '../components/RequestedIVes'

const RequestedIVesContainer = ({invoices}) => (
  <div className="has-Header">
    <h5>주문 리스트</h5>
    <div className="row col-md-12">
      <div className="col-md-3">주문일자</div>
      <div className="col-md-6">주문내용</div>
      <div className="col-md-3">주문금액</div>
    </div>
    <div className="row">
      {invoices.map((invoice, index) => (
        <RequestedIVes className="col-md-12" key={index} invoice={invoice}/>
      ))}
    </div>
  </div>
)


export default RequestedIVesContainer
