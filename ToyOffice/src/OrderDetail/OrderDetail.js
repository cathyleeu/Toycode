import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import './index.css'
import OrderItem from './OrderItem'

class OrderDetail extends PureComponent {
  state = {
    loaded: false,
    order : this.props.order
  }
  componentWillReceiveProps(newProps){
    if(newProps.order !== this.props.order){
      this.setState({order: newProps.order, loaded: true})
    }
  }
  componentDidMount(){
    this.props.isGetIVesByUser()
  }
  renderOrderItem = (item) => <OrderItem key={item._id} item={item}/>
  render(){
    let {loaded, order} = this.state;

    if(loaded){
      console.log(order);
      return(
        <div className="Child-Cont">
          <div className="Order">
            <h3>주문내역</h3>
            {order.map(this.renderOrderItem)}
          </div>
        </div>
      )
    } else {
      return(
        <div>
          <p>로딩중</p>
        </div>
      )
    }
  }
}


const mapStateToProps = (state) => ({
  order: state.order.detail
})

export default connect(mapStateToProps, actions)(OrderDetail)
