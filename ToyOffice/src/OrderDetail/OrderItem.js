import React, { PureComponent } from 'react'
import moment from 'moment-timezone'
import OrderModal from './OrderModal'
import OrderModi from './OrderModi'
import OrderTrans from './OrderTrans'
import Perf from 'react-addons-perf'

class OrderItem extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      modifiability: props.item.modifiability,
      modi: false,
      transport: false
    }
    this.handleOrderModal = this.handleOrderModal.bind(this)
  }

  componentWillMount(){
    window.performance.mark('OrderItem')
  }
  componentDidMount(){
    console.log(window.performance.now('OrderItem'))
  }
  componentDidUpdate() {
    Perf.stop()
    Perf.printInclusive()
    Perf.printWasted()
  }
  handleOrderModal(name, state){
    Perf.start()
    this.setState({[name]: state})
  }
  render(){
    let { item, modiItem } = this.props, { delivery } = item, { address } = delivery;
    let deliInfo = [
      { title : "받는이", ctx: delivery.to },
      { title : "연락처", ctx: delivery.phone },
      { title : "우편번호", ctx: address.zipNo },
      { title : "주소", ctx: address.roadAddr },
      { title : "상세주소", ctx: address.detailAddr },
      { title : "요청 사항", ctx: item.requestDesc }
    ]
    console.log(this.props);
    return(
      <div className="Order-detail-card">
        <div className="Order-detail-top">
          <p>주문 일자 {moment(item.createdOn).tz("Asia/Seoul").format('YYYY.MM.DD')}</p>
          {this.state.modifiability
            ? (
              <div>
                <OrderModal
                  isModalOpen={this.state.modi}
                  closeModal={() => this.handleOrderModal('modi', false)}>
                  {this.state.modi && <OrderModi {...this.props} closeModal={() => this.handleOrderModal('modi', false)} modiItem={modiItem} />}
                </OrderModal>
                <button onClick={() => this.handleOrderModal('modi', true)}> 수정하기 </button>
              </div>)
            : (
              <div>
                <OrderModal
                  isModalOpen={this.state.transport}
                  closeModal={() => this.handleOrderModal('transport', false)}>
                  {this.state.transport && <OrderTrans {...this.props}/>}
                </OrderModal>
                <button onClick={() => this.handleOrderModal('transport', true)}> 운송장 번호 </button>
              </div>
            )
          }
        </div>
        <div className="Order-detail-body">
          <div className="Order-detail-state">
            <table className="Order-detail-table">
              <thead>
                <tr>
                  <th>상품명</th>
                  <th>수량</th>
                  <th>가격</th>
                </tr>
              </thead>
              <tbody>
                {item.requestedGoods.map((g, i) => <tr key={i}>
                  <td>{g.name}</td>
                  <td>{g.qutt}</td>
                  <td>{g.sales}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
          <div className="Order-detail-deli">
            <table>
              <tbody>
                {deliInfo.map((deli, i) => <tr key={i}>
                  <th>{deli.title}</th>
                  <td>{deli.ctx}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default OrderItem
