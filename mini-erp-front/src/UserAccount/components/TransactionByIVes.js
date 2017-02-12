import React from 'react';

function Commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const TransactionByIVes = ({invoice}) => {
  const commaSales = Commas(invoice.totalSales);
  return(
  <div className="transaction">
    <div className="transaction-top">
      <div className="transaction-top-h col-md-12">
        <p>주문번호:{invoice.invoiceId}</p>
        <h6><strong>거래명세서</strong></h6>
      </div>
      <div className="transaction-top-ctx">
        <div className="transaction-top-ctx-l w-30">
          <p>{invoice.userName} 귀하 금액을 영수함 </p>
          <p>총액: {commaSales}원</p>
        </div>
        <div className="transaction-top-ctx-r w-70">
          <div className="provider-l line-r w-10"><strong>공급자</strong></div>
          <div className="provider-r w-90">
            <div className="provider-r-1">
              <strong className="line-r col-md-4">등록번호</strong><p className="col-md-8">1234-12345</p>
            </div>
            <div className="provider-r-2">
              <strong className="line-r col-md-2">상호</strong><p className="line-r col-md-4">토이코드</p>
              <strong className="line-r col-md-2">성명</strong><p className="col-md-4">홍현기 (인)</p>
            </div>
            <div className="provider-r-1">
              <strong className="line-r col-md-4">사업장소재지</strong><p className="col-md-8">강남대로 408 13층</p>
            </div>
            <div className="provider-r-3">
              <strong className="line-r col-md-2">업태</strong><p className="line-r col-md-4">서비스</p>
              <strong className="line-r col-md-2">종목</strong><p className="col-md-4">서적</p>
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
      {invoice.requestedGoods.map((goods,i) => {
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
    </div>
    <div className="transaction-btm">
      <strong className="line-r col-md-1">배송비</strong>
      <p className="line-r col-md-5">0원</p>
      <strong className="line-r col-md-2">합계</strong>
      <p className="col-md-4">{commaSales}원</p>
    </div>
  </div>
)}


export default TransactionByIVes;
