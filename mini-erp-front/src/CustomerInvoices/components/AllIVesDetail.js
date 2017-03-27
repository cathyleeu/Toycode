import React, {Component} from 'react'
import './AllIVesDetail.css'
import moment from 'moment-timezone'

function Commas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
class AllIVesDetail extends Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      class: "IV-Goods"
    }
  }
  handleClick = (e) => {
    if(this.state.open) {
      this.setState({ open: false, class: "IV-Goods" })
    } else {
      this.setState({ open: true, class: "IV-Goods open" })
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
            </div>
            {iv.requestedGoods.map((goods, i) => (
              <div key={i} className="IV-Goods-Info">
                <p>{goods.name} / {goods.qutt}권 / {Commas(goods.sales)}</p>
              </div>
            ))}
          </div>
          <button onClick={this.handleClick} className='detail-btn'>상세보기</button>
        </div>
        <div className="IV-Goods-detail">
          {this.props.children}
        </div>
      </div>
    )
  }
}


export default AllIVesDetail
