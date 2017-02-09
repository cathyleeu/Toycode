import React, {Component} from 'react';
import './RequestedIVes.css'
import AddrModal from '../../Shop/components/AddrModal'


// const RequestedIVes = ({invoice}) => {
  //TODO: mongoDB에서 momentJs 활용하여 한국시간으로 받아와야함

class RequestedIVes extends Component{
  constructor(props){
    super(props)
    this.state={
      isBillOpen: false,
      isRTnOpen: false
    }
  }
  openBill = () => {
    this.setState({ isBillOpen: true })
  }
  openRTn = () => {
    this.setState({ isRTnOpen: true })
  }
  closeModal = () => {
		this.setState({ isBillOpen: false, isRTnOpen: false})
	}
  render(){
    const {invoice} = this.props
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
        <div className="requestedIVes-inquiry col-md-12">
          <div className="requestedIVes-inquiry-ctx col-md-8">
            <strong>고객문의사항</strong>
            <p>{invoice.requestDesc}</p>
          </div>
          <div className="requestedIVes-inquiry-btn col-md-4">
            <button onClick={this.openBill}>거래명세서</button>
            <AddrModal
              isModalOpen={this.state.isBillOpen}
              closeModal={this.closeModal}>
							<i className="fa fa-times-circle search-close" aria-hidden="true" onClick={this.closeModal}></i>
              <div className="transaction">
                <div className="transaction-top">
                  <div className="transaction-top-h col-md-12">
                    <p>주문번호:{invoice.invoiceId}</p>
                    <h6><strong>거래명세서</strong></h6>
                  </div>
                  <div className="transaction-top-ctx">
                    <div className="transaction-top-ctx-l col-md-4">
                      <p>{invoice.userName} 귀하 금액을 영수함 </p>
                      <p>총액: {invoice.totalSales}원</p>
                    </div>
                    <div className="transaction-top-ctx-r col-md-8">
                      <div className="provider-l col-md-1"><strong>공급자</strong></div>
                      <div className="provider-r col-md-11">
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
                  {invoice.requestedGoods.map((goods,i) => (
                    <div key={i} className="transaction-body-ctx">
                      <p className="line-r col-md-1">{i+1}</p>
                      <p className="line-r col-md-5">{goods.name}</p>
                      <p className="line-r col-md-2">{goods.qutt}</p>
                      <p className="line-r col-md-2">{goods.sales}</p>
                      <p className="col-md-2">{goods.sales*goods.qutt}</p>
                    </div>
                  ))}
                </div>
                <div className="transaction-btm">
                  <strong className="line-r col-md-1">배송비</strong>
                  <p className="line-r col-md-5">0원</p>
                  <strong className="line-r col-md-2">합계</strong>
                  <p className="col-md-4">{invoice.totalSales}원</p>
                </div>
              </div>
            </AddrModal>
            <button onClick={this.openRTn}>반품접수</button>
            <AddrModal
              isModalOpen={this.state.isRTnOpen}
              closeModal={this.closeModal}>
							<i className="fa fa-times-circle search-close" aria-hidden="true" onClick={this.closeModal}></i>

            </AddrModal>
          </div>
        </div>
      </div>
    )
  }
}

export default RequestedIVes
