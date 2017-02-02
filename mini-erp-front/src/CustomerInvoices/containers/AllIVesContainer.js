import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import {AllUserIVes, SearchAllIVes} from '../components'


class AllIVesContainer extends Component {
  componentWillMount(){
    this.props.fetchAllUserIVes()
  }
  render(){
    const {allIVes} = this.props
    return(
      <div className="has-Header Container">
        <SearchAllIVes />
        <AllUserIVes allIVes={allIVes}/>
      </div>
    )
  }
}




function mapStateToProps(state){
  return {
    allIVes: state.cstIVes.allIVes
  }
}

export default connect(mapStateToProps, actions)(AllIVesContainer)
