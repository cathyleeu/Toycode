import React, {PureComponent} from 'react'
import './AllIVesDetail.css'
import moment from 'moment-timezone'

function Commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
class AllIVesDetail extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      class: "IV-Goods",
      status: props.iv.status,
      trackingNo: props.iv.trackingNo || '',
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({status: nextProps.iv.status, trackingNo: nextProps.iv.trackingNo})
  }
  handleClick = (e) => {
    if(this.state.open) {
      this.setState({ open: false, class: "IV-Goods" })
    } else {
      this.setState({ open: true, class: "IV-Goods open" })
    }
  }
  isHandleChange = (e) => {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }
  isPostTrackNo = () => {
    if(!this.state.trackingNo){
      alert('운송장을 입력하세요.')
    } else {
      this.props.postTrackNumber(this.state.trackingNo, this.props.iv.invoiceId)
      // console.log('운송장 등록하기', this.state.trackingNo, this.props.iv.invoiceId)
    }
  }
  render(){
    const {iv} = this.props
    const date = moment(iv.createdOn).tz("Asia/Seoul").format('YYYY년 MM월 DD일');
    return(
      <div className={this.state.class}>
        <div className='IV-Goods-abbr-cont'>
          <div className="IV-Goods-abbr">
            <div className="IV-Goods-abbr-top">
              <strong>주문일자</strong><p>{date}</p><strong>고객 명</strong><p>{iv.userName} | {iv.userCode}</p>
              <button onClick={this.handleClick} className='detail-btn'>상세보기</button>
            </div>
            {iv.requestedGoods.map((goods, i) => (
              <div key={i} className="IV-Goods-Info">
                <p>{goods.name} / {goods.qutt}권 / {Commas(goods.sales)}</p>
              </div>
            ))}
          </div>
          {this.state.status !== 'FFMT'
            ? <div className="track-cont">
                <input type='number' value={this.state.trackingNo} name='trackingNo' onChange={this.isHandleChange}/>
                <button onClick={this.isPostTrackNo} className='detail-btn'>운송장 입력</button>
              </div>
            : <div>
                <p>운송장 번호: <a href="https://www.hanjin.co.kr/Delivery_html/inquiry/personal_inquiry.jsp" target="_blank">{this.state.trackingNo}</a></p>
              </div>
          }
        </div>
        <div className="IV-Goods-detail">
          {this.props.children}
        </div>
      </div>
    )
  }
}


export default AllIVesDetail
