import React from 'react'
import moment from 'moment-timezone'


const OrderItem = ({item}) => {

  let { delivery } = item, {address} = delivery;
  let deliInfo = [
    { title : "받는이", ctx: delivery.to },
    { title : "연락처", ctx: delivery.phone },
    { title : "우편번호", ctx: address.zipNo },
    { title : "주소", ctx: address.roadAddr },
    { title : "상세주소", ctx: address.detailAddr },
    { title : "요청 사항", ctx: item.requestDesc }
  ]
  return(
  <div className="Order-detail-card">
    <div className="Order-detail-top">
      <p>주문 일자</p><p>{moment(item.createdOn).tz("Asia/Seoul").format('YYYY.MM.DD')}</p>
    </div>
    <div className="Order-detail-body">
      <div className="Order-detail-state">
        <table className="Order-detail-table">
          <thead>
            <tr>
              <th>상품명</th>
              <th>수량</th>
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
            {item.requestedGoods.map((g, i) => <tr key={i}>
              <td>{g.name}</td>
              <td>{g.qutt}</td>
              <td>{g.sales}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
      <div className="Order-detail-deli">
        <table>
          <tbody>
            {deliInfo.map((deli, i) => <tr key={i}>
              <th>{deli.title}</th>
              <td>{deli.ctx}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}

export default OrderItem
