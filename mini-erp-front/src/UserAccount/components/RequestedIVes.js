import React, {Component} from 'react';
import './RequestedIVes.css'
import AddrModal from '../../Shop/components/AddrModal'
import TransactionByIVes from './TransactionByIVes'
import ReturnGoodsByIVes from './ReturnGoodsByIVes'


// const RequestedIVes = ({invoice}) => {
  //TODO: mongoDB에서 momentJs 활용하여 한국시간으로 받아와야함
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
    const orderCreated = invoice.createdOn.split("T")
    const commaTotalSales = Commas(invoice.totalSales);
    const display = {display: "none"};
    return(
      <div className="requestedIVes-body col-md-12">
        <div className="requestedIVes-contents">
          <div className="requestedIVes-date col-md-3">{orderCreated[0]}</div>
          <div className="requestedIVes-goods col-md-6">
            {invoice.requestedGoods.map((goods,i) => {
              const commaSales = Commas(goods.sales);
              return(
              <div key={i} className="requestedIVes-goods-info">
                <strong>{goods.name}</strong>
                <p>{goods.qutt} 부</p>
                <div className="requestedIVes-goods-line"></div>
                <p>{commaSales} 원</p>
              </div>
            )})}
          </div>
          <div className="requestedIVes-total col-md-3">
            <p>Total</p>
            <strong>{commaTotalSales} 원</strong>
          </div>
        </div>
        <div className="requestedIVes-inquiry col-md-12">
          <div className="requestedIVes-inquiry-ctx col-md-7">
            <strong>고객문의사항</strong>
            <p>{invoice.requestDesc}</p>
          </div>
          <div className="requestedIVes-inquiry-btn col-md-5" style={display}>
            <button onClick={this.openBill}>거래명세서</button>
            <AddrModal isModalOpen={this.state.isBillOpen} closeModal={this.closeModal}>
							<i className="fa fa-times-circle search-close" aria-hidden="true" onClick={this.closeModal}></i>
              <TransactionByIVes invoice={invoice} />
            </AddrModal>
            <button onClick={this.openRTn}>반품/교환 접수</button>
            <AddrModal
              isModalOpen={this.state.isRTnOpen}
              closeModal={this.closeModal}>
							<i className="fa fa-times-circle search-close" aria-hidden="true" onClick={this.closeModal}></i>
              <ReturnGoodsByIVes invoice={invoice} requestRefundByUser={requestRefundByUser} />
            </AddrModal>
          </div>
        </div>
      </div>
    )
  }
}

export default RequestedIVes
