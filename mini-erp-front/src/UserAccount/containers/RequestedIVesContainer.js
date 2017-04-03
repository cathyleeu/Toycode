import React, {Component} from 'react';
import RequestedIVes from '../components/RequestedIVes'
import { connect } from 'react-redux'
import { requestRefundByUser, postToRefundServer } from '../actions'
import { getInvoices } from '../../Shop/actions/cart'
import './RequestedIVesContainer.css'


class RequestedIVesContainer extends Component {
  componentDidMount(){
    this.props.getInvoices()
  }
  isChildIVes = (invoice, i) => <RequestedIVes className="col-md-12" key={i} invoice={invoice} requestRefundByUser={this.props.requestRefundByUser}/>
  render(){
    console.log("RequestedIVesContainer",this.props)
    return(
      <div>
        <h5>주문 내역</h5>
        <div className="requestedIV-list-cont">
          <div className="requestedIV-list-title col-md-12">
            <div className="col-md-2">주문일자</div>
            <div className="col-md-7">주문내용</div>
            <div className="col-md-3">주문금액</div>
          </div>
          <div className="requestedIV-list-body">
            {this.props.invoices.map(this.isChildIVes)}
          </div>
        </div>
      </div>
    )
  }

}


function mapStateToProps(state, ownProps){
  return {
    invoices: state.shop.userInvoices
  }
}
export default connect(mapStateToProps, {requestRefundByUser, postToRefundServer, getInvoices})(RequestedIVesContainer)
