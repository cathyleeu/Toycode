import React, {Component} from 'react';
import './RequestedIVes.css'
import AddrModal from '../../Shop/components/AddrModal'
import TransactionByIVes from './TransactionByIVes'
import ReturnGoodsByIVes from './ReturnGoodsByIVes'
import moment from 'moment-timezone'


function Commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
    const {invoice, requestRefundByUser} = this.props
    const { to, address, phone } = invoice.delivery;
    const orderCreated = moment(invoice.createdOn).tz("Asia/Seoul").format('YYYY년 MM월 DD일');
    const commaTotalSales = Commas(invoice.totalSales);
    const display = {display: "none"};
    return(
      <div className="requestedIVes-body">
        <div className="requestedIVes-contents">
          <div className="requestedIVes-date col-md-3">{orderCreated}</div>
          <div className="requestedIVes-goods col-md-7">
            {invoice.requestedGoods.map((goods,i) => {
              const commaSales = Commas(goods.sales);
              return(
              <div key={i} className="requestedIVes-goods-info">
                <div className="requestedIVes-goods-line">
                  <strong>{goods.name}</strong>
                  <p>{goods.qutt} 부</p>
                </div>
                <p>{commaSales} 원</p>
              </div>
            )})}
          </div>
          <div className="requestedIVes-total col-md-2">
            <p>Total</p>
            <strong>{commaTotalSales} 원</strong>
          </div>
        </div>
        <div className="requestedIVes-btm">
          <h6>받는 분</h6>
          <div className="requestedIVes-recipient">
            <p><strong>수령인</strong>{to}</p>
            <p><strong>연락처</strong>{phone}</p>
            <p><strong>배송시</strong>{address.zipNo}, {address.roadAddr}, {address.detailAddr}</p>
          </div>
          <div className="requestedIVes-inquiry">
            <div className="requestedIVes-inquiry-ctx w-70">
              <strong>고객문의사항</strong>
              <p>{invoice.requestDesc}</p>
            </div>
            <div className="requestedIVes-inquiry-btn w-30" style={display}>
              <button onClick={this.openBill} className="bill">거래명세서</button>
              <AddrModal isModalOpen={this.state.isBillOpen} closeModal={this.closeModal}>
  							<i className="fa fa-times-circle search-close" aria-hidden="true" onClick={this.closeModal}></i>
                <TransactionByIVes invoice={invoice} />
                <button onClick={() => window.print()}>인쇄하기</button>
              </AddrModal>
              <button onClick={this.openRTn} className="return-btn">반품/교환 접수</button>
              <AddrModal
                isModalOpen={this.state.isRTnOpen}
                closeModal={this.closeModal}>
  							<i className="fa fa-times-circle search-close" aria-hidden="true" onClick={this.closeModal}></i>
                <ReturnGoodsByIVes invoice={invoice} requestRefundByUser={requestRefundByUser} />
              </AddrModal>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default RequestedIVes
