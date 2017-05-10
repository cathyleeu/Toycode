
import React from 'react'

const OrderTrans = ({item}) => (
  <div>
    <p>
      운송장 번호는 <a href="https://www.hanjin.co.kr/Delivery_html/inquiry/personal_inquiry.jsp" target="_blank">{item.trackingNo}</a> 입니다.
    </p>
    <p>
      운송장 번호를 클릭하시면, 배송추적 사이트로 넘어갑니다.
    </p>
  </div>
)


export default OrderTrans
