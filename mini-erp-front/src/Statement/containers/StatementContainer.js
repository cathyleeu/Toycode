import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../../CustomerInvoices/actions'

class StatementContainer extends Component{

  componentDidMount(){
    this.props.fetchAllUserIVes()
  }
  render(){
    // let {allState} = this.props;
    // if() {allState}
    return(
      <div className="has-Header Container">

        <p>for StatementContainer</p>
        <div>Catalog Header
          <p> search goods</p>
          <p> register goods to button</p>
        </div>
        <div>
          <p> Catalog List</p>
        </div>
      </div>
    )
  }
}


//
// const StatementContainer = () => (
//   <div className="has-Header Container">
//     <p>for StatementContainer</p>
//     <div>Catalog Header
//       <p> search goods</p>
//       <p> register goods to button</p>
//     </div>
//     <div>
//       <p> Catalog List</p>
//     </div>
//   </div>
// )
function mapStateToProps(state){
  return {
    allState: state.cstIVes.allIVes
  }
}

export default connect(mapStateToProps, actions)(StatementContainer)

// export default StatementContainer
