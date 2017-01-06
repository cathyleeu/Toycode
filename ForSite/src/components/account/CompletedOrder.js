import React from 'react';


const CompletedOrder = ({invoice}) => {
  //TODO: mongoDB에서 momentJs 활용하여 한국시간으로 받아와야함
  const orderCreated = invoice.createdOn.split("T")
  const margin = {
    margin:'0 1em'
  }
  return(
  <div className="row col-md-12">
    <div className="col-md-3">{orderCreated[0]}</div>
    <div className="col-md-6">
      {invoice.requestedGoods.map((goods,i) => (
        <div key={i} className="row">
          <p>상호명: {goods.name}</p>
          <p>수량: {goods.qutt}</p>
          <p>가격: {goods.sales}</p>
        </div>
      ))}
    </div>
    <div className="col-md-3">총 가격:{invoice.totalSales}</div>
    <div className="row col-md-12">
      <strong style={margin}>고객문의사항:</strong><p>{invoice.requestDesc}</p>
    </div>
  </div>
)}

export default CompletedOrder
