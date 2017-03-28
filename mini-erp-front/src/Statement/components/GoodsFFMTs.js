import React, {Component} from 'react'
import moment from 'moment-timezone'
import DatePicker from 'react-datepicker'
import GoodsFFMT from './GoodsFFMT'
import './state.css'
import 'react-datepicker/dist/react-datepicker.css';

class GoodsFFMTs extends Component {
  constructor(props){
    super(props)
    this.state ={
      date: moment(),
    }
  }
  dateChange = (date) => {
    this.setState({date})
  }
  render(){
    let selectedDate = moment(this.state.date).tz("Asia/Seoul").format('MM월 DD일')
    let ffmtGoods = this.props.allFFMT.filter(ffmt => moment(ffmt.releaseDate).tz("Asia/Seoul").format('MM월 DD일') === selectedDate)
    return(
      <div>
        <div className="statement-top">
          <h3>매출표 (출고기준)</h3>
          <div className="statement-date">
            <p>날짜선택</p>
            <DatePicker
              selected={this.state.date}
              onChange={this.dateChange}
             />
          </div>
         </div>
         <div>
           <div className="statement-item-top">
             <p>판매처</p>
             <p>품명</p>
             <p>수량</p>
             <p>단가</p>
             <p>금액</p>
           </div>
           {ffmtGoods.map((ffmt, i) => <GoodsFFMT key={i} goodsFFMT={ffmt.requestedGoods} ffmt={ffmt}/>)}
           {/* <div className="statement-item-btm">
             <p>총 수량</p>
             <p></p>
             <p>총 금액</p>
             <p></p>
           </div> */}
         </div>

      </div>
    )
  }
}

export default GoodsFFMTs;
