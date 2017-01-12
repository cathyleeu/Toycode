import React, {Component} from 'react';
import { connect } from 'react-redux'
import Branch from './Branch'
import RegisteredKinder from './RegisteredKinder'
import CompletedBranch from './CompletedBranch'
import * as actions from '../../actions/kindergarten'

class BranchCont extends Component{
  constructor(props){
    super(props)
    this.state = {
      isEditing: false
    }
  }
  handleAddChildClick = e => {
    e.preventDefault()
    const { addChild, createKinder } = this.props
    const childId = createKinder('유치원').kinderId
    addChild(childId)
  }

  renderChild = childId => {
    const { id} = this.props
    return (
      <div key={childId.id}>
        <Branch id={childId.id} parentId={id} />
      </div>
    )
  }
  isEdited = () => {
    this.setState({isEditing:!this.state.isEditing})
  }
  isSaved = () => {
    const { completedAddKinder, kinders } = this.props
    this.setState({isEditing:!this.state.isEditing},
    ()=> completedAddKinder(kinders))
  }
  render() {
    const { kinders, user, completedAddKinder } = this.props
    const kindergartens = kinders.kinder
    return (
      <div className="row">
        {/* TODO-3: user값을 컴포넌트가 렌더링 하기전에 들고와야함. */}
        <div>
          <div>지사명:{user.branch.Name}</div>
          <div>지사주소:{user.branch.Address}</div>
          <div>사업자주소:{user.branch.License}</div>
        </div>
        <div className="row col-md-12">
          <h5 className="col-md-9"> 지사 소속 유치원 리스트</h5>
          {this.state.isEditing ?(
            <div className="row col-md-3">
              <button
                className="btn btn-outline-secondary col-md-4"
                onClick={this.isEdited}>
                취소</button>
              <button
                className="btn btn-success col-md-4"
                onClick={this.isSaved}>저장</button>
              <button
                className="btn btn-danger col-md-4"
                onClick={this.handleAddChildClick}>
                유치원 추가</button>
            </div>
          ):(
            <button
              className="btn btn-info col-md-1"
              onClick={this.isEdited}>수정</button>
          )}
        </div>
        <div className="col-md-12">
          {this.state.isEditing ? (
            <div>
              {user && user.kinder.map((kinder, i) => <RegisteredKinder key={i} kinder={kinder}/> )}
              {kindergartens.map(this.renderChild)}
            </div>
          ): <CompletedBranch kinders={user.kinder}/>}
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

export default connect(mapStateToProps, actions)(BranchCont)
