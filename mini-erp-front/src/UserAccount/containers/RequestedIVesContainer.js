import React from 'react';
import RequestedIVes from '../components/RequestedIVes'
import './RequestedIVesContainer.css'


const RequestedIVesContainer = ({invoices}) => (
  <div>
    <h5>주문 리스트</h5>
    <div className="requestedIV-list-cont">
      <div className="requestedIV-list-title col-md-12">
        <div className="col-md-2">주문일자</div>
        <div className="col-md-7">주문내용</div>
        <div className="col-md-3">주문금액</div>
      </div>
      <div className="requestedIV-list-body">
        {invoices.map((invoice, index) => (
          <RequestedIVes className="col-md-12" key={index} invoice={invoice}/>
        ))}
      </div>
    </div>
  </div>
)


export default RequestedIVesContainer
