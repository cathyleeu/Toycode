import React, {Component} from 'react';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import Branch from './Branch'
import * as actions from '../../actions/kindergarten'

class AccountCont extends Component{
  constructor(){
    super()
    this.state = {
      kinderName : '유치원'
    }
  }
  handleAddChildClick = e => {
    e.preventDefault()
    const { addChild, createKinder, user } = this.props
    //유치원 명이 들어가면 될 듯 함
    const childId = createKinder(this.state.kinderName, user.branch.Name, user.branch.License).kinderId
    addChild(childId)
  }

  renderChild = childId => {
    const { id } = this.props
    return (
      <div key={childId.id}>
        <Branch id={childId.id} parentId={id} />
      </div>
    )
  }
  render() {
    const { kinders, user } = this.props
    const kindergartens = kinders.branch.kinder
    return (
      <div className="row">
        <div>
          <div>지사명:{user.branch.Name}</div>
          <div>지사주소:{user.branch.Address}</div>
          <div>사업자주소:{user.branch.License}</div>
        </div>
        <div className="row col-md-12">
          <h5 className="col-md-11"> 지사 소속 유치원 리스트</h5>
          <button
            className="col-md-1 btn btn-danger"
            onClick={this.handleAddChildClick}>
            유치원 추가</button>
        </div>

        <div className="col-md-12">
          {kindergartens.map(this.renderChild)}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    user: state.auth.user,
    kinders: state.kindergarten
  }
}

export default connect(mapStateToProps, actions)(AccountCont)









// const AccountCont = ({user, completedAddKinder, addKinder}) => {
//   //TODO: redux 연결해서 data 받기
//   const KinData = {
//     kindergartens:[
//       {
//         name: '수수유치원',
//         class:[
//           {classname:'쌔싹반', students: 10},
//           {classname:'누리반', students: 11}
//         ]
//       },
//       {
//         name: '나라유치원',
//         class:[
//           {classname:'나나반', students: 10},
//           {classname:'니니반', students: 11}
//         ]
//       }
//     ]
//   }
