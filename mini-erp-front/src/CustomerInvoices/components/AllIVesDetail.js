import React, {Component} from 'react'
import './AllIVesDetail.css'


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
    const date = iv.createdOn.split("T")[0]
    return(
      <div className={this.state.class}>
        <button onClick={this.handleClick}>상세보기</button>
        <div className="IV-Goods-abbr">
          <div className="IV-Goods-abbr-top">
            <p>{date} | {iv.status}</p>
          </div>
          {iv.requestedGoods.map((goods, i) => (
            <div key={i} className="IV-Goods-Info">
              <p>{goods.name} / {goods.qutt}권 / {goods.sales}</p>
            </div>
          ))}
        </div>
        <div className="IV-Goods-detail">
          {this.props.children}
        </div>
      </div>
    )
  }
}


export default AllIVesDetail
