import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import ChildOrders from './ChildOrders'



class NewOrders extends Component {
  componentDidMount(){
    this.props.fetchAllRQT()
  }
  renderChildOrders = (rqt , i) => <ChildOrders rqt={rqt} key={i} />
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.getDayStatement(this.props.rqt)
  }
  render(){
    return(
      <div className='cst-container'>
        <form onSubmit={this.handleSubmit}>
        {/* <form target='_blank' method='GET' action="http://localhost:3090/xlsx"> */}
          <label>
            금일 출고 요청 건
            <input type='submit' value='거래명세서' />
          </label>
        </form>
        {this.props.rqt.map(this.renderChildOrders)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  rqt: state.notice.allRQT
})

export default connect(mapStateToProps, actions)(NewOrders)
