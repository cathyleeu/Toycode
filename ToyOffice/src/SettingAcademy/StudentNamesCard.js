import React, { PureComponent } from 'react'
import FlatButton from 'material-ui/FlatButton';
import { TextWithLabel, DirectionContainer } from '../Components'
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
      <div className="academy-card-cont" style={{display: "flex", alignItems: "center"}}>
        <DirectionContainer direction="row" width="30%" alignItems="center">
          <TextWithLabel
            title={`${this.props.academyName} > ${this.props.className}`}
            content={this.props.name}
          />
        </DirectionContainer>
        <DirectionContainer direction="row" width="60%" justifyContent="space-around">
          <FlatButton
            labelStyle={{color: "#e8a735"}}
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
           labelStyle={{color: "#03396c"}}
           data-result="student"
           label="학생 이력관리"
           secondary={true}
           onClick={this.handleRouter}
          />
      </DirectionContainer>
      </div>
    )
  }
}
