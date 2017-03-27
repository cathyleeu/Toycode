import React, {Component} from 'react'
import AllIVesDetail from './AllIVesDetail'

function pager(page) {
  var pageLinks = []
  if (page.currentPage > 1) {
    if (page.currentPage > 2) {
      pageLinks.push(<span key='0' className="pageLink" onClick={page.handleClick(1)}>«</span>)
      pageLinks.push(' ')
    }
    pageLinks.push(<span key='1' className="pageLink" onClick={page.handleClick(page.currentPage - 1)}>‹</span>)
    pageLinks.push(' ')
  }
  pageLinks.push(<span key='2' className="currentPage">Page {page.currentPage} of {page.numPages}</span>)
  if (page.currentPage < page.numPages) {
    pageLinks.push(' ')
    pageLinks.push(<span key='3' className="pageLink" onClick={page.handleClick(page.currentPage + 1)}>›</span>)
    if (page.currentPage < page.numPages - 1) {
      pageLinks.push(' ')
      pageLinks.push(<span key='4' className="pageLink" onClick={page.handleClick(page.numPages)}>»</span>)
    }
  }
  return <div className="pagination">{pageLinks}</div>
}

class AllUserIVes extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentPage: 1
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({currentPage: 1})
  }
  getPage = () => {
    var start = this.props.pageSize * (this.state.currentPage - 1)
    var end = start + this.props.pageSize
    return {
      currentPage: this.state.currentPage
    , allIVes: this.props.allIVes.slice(start, end)
    , numPages: this.getNumPages()
    , handleClick: function(pageNum) {
        return function() { this.handlePageChange(pageNum) }.bind(this)
      }.bind(this)
    }
  }
  getNumPages = () => {
    var numPages = Math.floor(this.props.allIVes.length / this.props.pageSize)
    if (this.props.allIVes.length % this.props.pageSize > 0) {
      numPages++
    }
    return numPages
  }
  handlePageChange = (pageNum) => {
    this.setState({currentPage: pageNum})
  }
  render(){
    let page = this.getPage();
    return(
      <div>
        { page.allIVes.map(
          (iv , i) => (
              <div key={i} className="cst-container">
                <AllIVesDetail iv={iv}>
                  <div className="IV-Goods-detail-info">
                    <div className="IV-Recipient"><p> 받는 사람 정보 | {iv.invoiceId} </p></div>
                    <div className="IV-Recipient-detail"><strong>받는이</strong><p>{iv.delivery.to} | {iv.delivery.phone} | {iv.userEmail}</p></div>
                    <div className="IV-Recipient-addr"><strong>주소</strong><p>{iv.delivery.address.zipNo} | {iv.delivery.address.roadAddr} | {iv.delivery.address.detailAddr}</p></div>
                    <div className="IV-Recipient-msg"><strong>요청사항</strong><p>{iv.requestDesc}</p></div>
                  </div>
                </AllIVesDetail>
              </div>
            )
          )
        }
        <div className='pagination-btm'>{pager(page)}</div>
      </div>
    )
  }
}

export default AllUserIVes
