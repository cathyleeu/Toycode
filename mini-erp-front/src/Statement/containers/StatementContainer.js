import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import GoodsFFMTs from '../components/GoodsFFMTs'

class StatementContainer extends Component{
  componentDidMount(){
    this.props.fetchAllFFMT()
  }
  render(){
    const { allFFMT } = this.props;
    return(
      <div className="has-Header Container">
        {allFFMT && <GoodsFFMTs allFFMT={this.props.allFFMT} getXlsxFFMTaDay={this.props.getXlsxFFMTaDay}/>}

      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    allFFMT: state.statement.allFFMT
  }
}

export default connect(mapStateToProps, actions)(StatementContainer)
