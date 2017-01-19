import React from 'react';
import './RequestedIVes.css'


const RequestedIVes = ({invoice}) => {
  //TODO: mongoDB에서 momentJs 활용하여 한국시간으로 받아와야함
  const orderCreated = invoice.createdOn.split("T")
  return(
  <div className="requestedIVes-body col-md-12">
    <div className="requestedIVes-contents">
      <div className="requestedIVes-date col-md-3">{orderCreated[0]}</div>
      <div className="requestedIVes-goods col-md-6">
        {invoice.requestedGoods.map((goods,i) => (
          <div key={i} className="requestedIVes-goods-info">
            <strong>{goods.name}</strong>
            <p>{goods.qutt}</p>
            <div className="requestedIVes-goods-line"></div>
            <p>{goods.sales}</p>
          </div>
        ))}
      </div>
      <div className="requestedIVes-total col-md-3">
        <p>Total</p>
        <strong>{invoice.totalSales}</strong>
      </div>
    </div>
    <div className="requestedIVes-inquire-body col-md-12">
      <strong>고객문의사항</strong>
      <p>{invoice.requestDesc}</p>
    </div>
  </div>
)}

export default RequestedIVes
