import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import './index.css'
import OrderItem from './OrderItem'



/*

shouldComponentUpdate(nextProps, nextState){
  if(nextProps.order !== this.props.order){
    console.log("shouldComponentUpdate", nextProps);
    // PureComponent를 사용했지만 더 detail하게 사용하여 render수를 줄임
    // 여기서 this.setState를 설정하는 것이 아님! componentWillReceiveProps가 먼저 실행되기 때문에
    return true
  }
  return false //false 없으면 오류가 생김
}

*/
class OrderDetail extends PureComponent {
  state = {
    loaded: false,
    order : this.props.order
  }
  componentWillReceiveProps(newProps){
    console.log("OrderDetail _ componentWillReceiveProps");
    if(newProps.order !== this.props.order){
      this.setState({order: newProps.order, loaded: true})
    }
  }
  componentDidMount(){
    this.props.isGetIVesByUser()
  }
  renderOrderItem = (item) => <OrderItem key={item._id} item={item} {...this.props}/>
  render(){
    let {loaded, order} = this.state;
    if(loaded){
      console.log("OrderDetail _ render");
      return(
        <div className="Child-Cont">
          <div className="Order">
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
  componentWillUnmount(){
    //화면에서 아예 페이지가 사라질때 발생!
    console.log("componentWillUnmount")
  }
}


const mapStateToProps = (state) => ({
  order: state.order.detail,
  modiGoods: state.order.modiGoods

})

export default connect(mapStateToProps, actions)(OrderDetail)
