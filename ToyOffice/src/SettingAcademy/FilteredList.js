import React, { PureComponent } from 'react'
import { ConditionalHeader, DirectionContainer, TextWithLabel, ToyCodePaper } from '../Components'
import FlatButton from 'material-ui/FlatButton';

class AcademyClassCard extends PureComponent {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleRouter = this.handleRouter.bind(this)
  }
  handleClick(e){
    let { result } = e.currentTarget.dataset;
    let { handleModal, modalHandleName, ...propsRest } = this.props;
    if(result === "edit") {
      this.props.handleModal(e, { ...propsRest })
      console.log("edit modal");
    } else {
      if(confirm('반을 삭제하시겠습니까?')){
        // this.props.completedDeleteAcademy(this.state.academy_id)
        console.log("delete");
      } else {
        console.log("delete cancle");
      }
    }
  }
  handleRouter() {
    let { handleModal, modalHandleName, history, match, createStudentIds, ...propsRest } = this.props;
    this.props.history.push(
      `/home/settingStudent/${propsRest.academyId}/${propsRest.className}`,
      { ...propsRest }
    )
  }
  render(){
    let subContent = {
      "A": "(만3세용)",
      "B": "(만4세용)",
      "C": "(만5세용)"
    }
    return(
      <ToyCodePaper>
        <DirectionContainer direction="row" alignItems="center">
          <DirectionContainer direction="row" width="60%" justifyContent="space-around">
            <TextWithLabel
              title={this.props.academyName}
              content={this.props.className}
            />
            <TextWithLabel
              title={'프로그램 레벨'}
              content={this.props.level}
              subContent={subContent[this.props.level]}
            />
          </DirectionContainer>
          <FlatButton
            data-result="student"
            // backgroundColor="#03396c"
            labelStyle={{color: "#03396c"}}
            label="학생 설정하기"
            secondary={true}
            onClick={this.handleRouter}
            style={{width: 140}}
           />
          <FlatButton
            data-result="edit"
            labelStyle={{color: "#e8a735"}}
            data-name={this.props.modalHandleName}
            label="수정"
            onClick={this.handleClick}
           />
          <FlatButton
            data-result="delete"
            label="삭제"
            secondary={true}
            onClick={this.handleClick}
           />
        </DirectionContainer>
      </ToyCodePaper>
    )
  }
}


export default class FilteredList extends PureComponent {
  constructor(){
    super()
    this.renderFilterLists = this.renderFilterLists.bind(this)
  }
  renderFilterLists(f, i) {
    return (
      <AcademyClassCard key={i}
        {...f}
        academyUrl={this.props.filtered.url}
        academyLang={this.props.filtered.lang}
        academyName={this.props.filtered.name}
        handleModal={this.props.handleModal}
        history={this.props.history}
        match={this.props.match}
        modalHandleName={this.props.modalHandleName}
      />
    )
  }
  render(){
    let { name, kinderClasses } = this.props.filtered;
    return(
      <div>
        <DirectionContainer direction="row">
          <ConditionalHeader
            headerStyle="Kinder-Cont-top"
            customMinWidth="250px"
            headerTitle={name}
            btnFront={
              [
                { purpose: "create", name: "반 등록하기", dataName: "createAcademyClass" }
              ]
            }
            onClick={this.props.handleModal}
          />
          {this.props.children}
        </DirectionContainer>
        {kinderClasses.map(this.renderFilterLists)}
      </div>
    )
  }
}
