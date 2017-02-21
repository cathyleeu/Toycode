import React from 'react';
import moment from 'moment-timezone'

function Commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const TransactionByIVes = ({invoice}) => {
  const { userName, delivery, requestedGoods, createdOn } = invoice;
  const { address, phone } = delivery;
  const commaSales = Commas(invoice.totalSales);
  return(
    <div>
      <div className="transaction">
        <div className="transaction-top">
          <div className="transaction-top-h">
            <div className="line-r transaction-top-h-side">
              <strong className="line-b">주문번호</strong>
              <p>{invoice.invoiceId}</p>
            </div>
            <div style={{width:"60%", paddingTop:"3px"}}>
              <h6><strong>거래명세서</strong><p>(공급받는자용)</p></h6>
            </div>
            <div className="transaction-top-h-side line-l">
              <strong className="line-b">거래일자</strong>
              <p>{moment(createdOn).tz('Asia/Seoul').format('YYYY년 MM월 DD일')}</p>
            </div>
          </div>
          <div className="transaction-top-ctx">
            <div className="transaction-top-ctx-l w-50">
              <div className="provider-l line-r w-10"><strong>공급받는자</strong></div>
              <div className="provider-r w-90">
                <div className="provider-r-1 w-100">
                  <strong className="line-r w-20">상호</strong><p className="w-80">{userName}</p>
                </div>
                <div className="provider-r-1 w-100">
                  <strong className="line-r w-20">전화번호</strong><p className="w-80">{phone}</p>
                </div>
                <div className="provider-r-2 w-100">
                  <strong className="line-r w-20">사업장 소재지</strong><p className="w-80">{address.roadAddr},{address.detailAddr}</p>
                </div>
                <div className="provider-r-3 w-100">
                  <strong className="line-r w-20">합계</strong><p className="w-80">{commaSales}원</p>
                </div>
              </div>
            </div>
            <div className="transaction-top-ctx-r w-50">
              <div className="provider-l line-r w-10"><strong>공급자</strong></div>
              <div className="provider-r w-90">
                <div className="provider-r-1 w-100">
                  <strong className="line-r w-20">등록번호</strong><p className="w-80">12-334-12345</p>
                </div>
                <div className="provider-r-2 w-100">
                  <strong className="line-r w-20">상호</strong><p className="line-r w-30">토이코드</p>
                  <strong className="line-r w-20">성명</strong><p className="w-30">홍현기 (인)</p>
                </div>
                <div className="provider-r-1 w-100">
                  <strong className="line-r w-20">사업장 소재지</strong><p className="w-80">서울시 강남구 강남대로 408 13층</p>
                </div>
                <div className="provider-r-3 w-100">
                  <strong className="line-r w-20">업태</strong><p className="line-r w-30">서비스</p>
                  <strong className="line-r w-20">종목</strong><p className="w-30">서적</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="transaction-body">
          <div className="transaction-body-top">
            <p className="line-r col-md-1">번호</p>
            <p className="line-r col-md-5">품목</p>
            <p className="line-r col-md-2">수량</p>
            <p className="line-r col-md-2">단가</p>
            <p className="col-md-2">공급가액</p>
          </div>
          {requestedGoods.map((goods,i) => {
            const commaEachPrice = Commas(goods.sales/goods.qutt)
            const commaTotalSales = Commas(goods.sales)
            return(
            <div key={i} className="transaction-body-ctx">
              <p className="line-r col-md-1">{i+1}</p>
              <p className="line-r col-md-5">{goods.name}</p>
              <p className="line-r col-md-2">{goods.qutt}</p>
              <p className="line-r col-md-2">{commaEachPrice}</p>
              <p className="col-md-2">{commaTotalSales}</p>
            </div>
          )})}
            <div className="transaction-body-ctx">
              <p className="line-r col-md-1">-</p>
              <p className="line-r col-md-5">-</p>
              <p className="line-r col-md-2">-</p>
              <p className="line-r col-md-2">-</p>
              <p className="col-md-2">-</p>
            </div>
        </div>
        <div className="transaction-btm">
          <strong className="line-r col-md-1">배송비</strong>
          <p className="line-r col-md-5">0원</p>
          <strong className="line-r col-md-2">합계</strong>
          <p className="col-md-4">{commaSales}원</p>
        </div>
      </div>
      <div>
        <button>인쇄하기</button>
      </div>
    </div>
)}


export default TransactionByIVes;
