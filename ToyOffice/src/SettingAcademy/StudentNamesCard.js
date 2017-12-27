import React, { PureComponent } from 'react'
import FlatButton from 'material-ui/FlatButton';
import { TextWithLabel, DirectionContainer, ToyCodePaper } from '../Components'
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
  //style={{display: "flex", alignItems: "center"}}
  render(){
    let { handleModal, history, modalHandleName, ...restProps} = this.props;
    return (
      <ToyCodePaper>
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
            data-name={this.props.modalHandleName}
            label="수정"
            onClick={(e) => this.props.handleModal(e, restProps)}
           />
          <FlatButton
            data-result="delete"
            label="삭제"
            secondary={true}
            onClick={() => this.props.delStudentName(restProps)}
           />
         <FlatButton
           labelStyle={{color: "#03396c"}}
           data-result="student"
           label="학생 이력관리"
           secondary={true}
           onClick={this.handleRouter}
          />
      </DirectionContainer>
      </ToyCodePaper>
    )
  }
}
