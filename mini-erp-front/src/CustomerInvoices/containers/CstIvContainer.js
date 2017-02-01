import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'


class CstIvContainer extends Component {
  componentWillMount(){
    this.props.fetchAllUserIVes()
  }
  render(){
    const {allIVes} = this.props
    return(
      <div className="has-Header Container">
        <h5>고객 주문 상황</h5>
        <div className="cst-container">
          모든 고객들의 주문 리스트
          { allIVes.map(
            (ives , i) => (
                <div key={i}>
                  <p>{ives.userCode}</p>
                  <p>{ives.userEmail}</p>
                  <div>
                    <p>주문한 상품</p>
                    {ives.requestedGoods.map((goods, i) => (
                      <div key={i}>
                        <p>{goods.name}</p>
                        <p>{goods.qutt}</p>
                        <p>{goods.sales}</p>
                      </div>
                    ))}
                  </div>
                  <p>{ives.delivery.address.detailAddr}</p>
                  <p>{ives.delivery.address.roadAddr}</p>
                  <p>{ives.delivery.address.zipNo}</p>
                </div>
              )
            )
          }
        </div>
      </div>
    )
  }
}




function mapStateToProps(state){
  return {
    allIVes: state.cstIVes.allIVes
  }
}

export default connect(mapStateToProps, actions)(CstIvContainer)
