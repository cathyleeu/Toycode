import React, { PureComponent } from 'react'
import FlatButton from 'material-ui/FlatButton';
import './index.css'

export default class StudentNamesCard extends PureComponent {
  constructor(props){
    super(props)
    this.handleRouter = this.handleRouter.bind(this)
  }
  handleRouter() {
    let { history, ...restProps} = this.props;
    this.props.history.push(`/home/studentDashboard/${this.props._id}`, restProps)
  }
  render(){
    return (
      <div className="academy-card-cont">
        <p className="academy-card-text">{this.props.academyName} > {this.props.className} > {this.props.name}</p>
        <FlatButton
          data-result="edit"
          // data-name={this.props.modalHandleName}
          label="수정"
          // onClick={this.handleClick}
         />
        <FlatButton
          data-result="delete"
          label="삭제"
          secondary={true}
          // onClick={this.handleClick}
         />
       <FlatButton
         data-result="student"
         label="학생 이력관리"
         secondary={true}
         onClick={this.handleRouter}
        />
      </div>
    )
  }
}
