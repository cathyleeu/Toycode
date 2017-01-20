import React from 'react';
import { connect } from 'react-redux'
import CompletedOrder from './CompletedOrder'

const CompletedList = ({invoices}) => (
  <div className="row">
    <h5>주문 리스트</h5>
    <div className="row col-md-12">
      <div className="col-md-3">주문일자</div>
      <div className="col-md-6">주문내용</div>
      <div className="col-md-3">주문금액</div>
    </div>
    <div className="row">
      {invoices.map((invoice, index) => (
        <CompletedOrder className="col-md-12" key={index} invoice={invoice}/>
      ))}
    </div>
  </div>
)


function mapStateToProps(state, ownProps){
  return {
    invoices: state.invoices
  }
}
export default connect(mapStateToProps)(CompletedList)