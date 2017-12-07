import React, { PureComponent } from 'react'
import { DirectionContainer } from '../Components'
import FlatButton from 'material-ui/FlatButton';

class SettingAcademyCard extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      name: props.name || "",
      lang: props.lang || "ko",
      phone: props.phone || "",
      manager: props.manager || "",
      managerPh: props.managerPh || "",
      url: props.url || "",
      academy_id: props._id || ""
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentWillMount(){

  }
  handleClick(e) {
    let { result } = e.currentTarget.dataset;
    if(result === "edit") {
      this.props.handleSettingAcademy(e, this.state)
    } else {
      if(confirm('반을 삭제하시겠습니까?')){
        this.props.completedDeleteAcademy(this.state.academy_id)
        console.log("delete");
      } else {
        console.log("delete cancle");
      }
    }
  }
  render(){
    let { name, lang, phone, manager, managerPh, url } = this.state;
    let languageOptions = {
      en : "English",
      ko : "한국어",
    }
    return(
      <div className="academy-card-cont">
        <DirectionContainer direction="column">
          <div>
            <p className="academy-card-header">{name}</p>
            <p className="academy-card-text">{phone}</p>
            <FlatButton
              data-result="edit"
              label="수정"
              onClick={this.handleClick}
             />
            <FlatButton
              data-result="delete"
              label="삭제"
              secondary={true}
              onClick={this.handleClick}
             />
          </div>
          <DirectionContainer direction="row">
            <DirectionContainer direction="row" width="50%" alignItems="center">
              <p className="academy-card-header2">담당자</p>
              <p className="academy-card-text">{manager}</p>
            </DirectionContainer>
            <DirectionContainer direction="row" width="50%" alignItems="center">
              <p className="academy-card-header2">담당자 전화번호</p>
              <p className="academy-card-text">{managerPh}</p>
            </DirectionContainer>
          </DirectionContainer>
          <DirectionContainer direction="row">
            <DirectionContainer direction="row" width="50%" alignItems="center">
              <p className="academy-card-header2">프로그램 사이트</p>
              <a
                target="_blank"
                href={`https://www.toycode.org/code/${url}`}
                className="academy-card-link">
                {`toycode.org/code/${url}`}
              </a>
            </DirectionContainer>
            <DirectionContainer direction="row" width="50%" alignItems="center">
              <p className="academy-card-header2">프로그램 언어</p>
              <p className="academy-card-text">{languageOptions[lang]}</p>
            </DirectionContainer>
          </DirectionContainer>
        </DirectionContainer>
      </div>
    )
  }
}

export default SettingAcademyCard
