import React, { PureComponent } from 'react'
import { DirectionContainer, ToyCodePaper, TextWithLabel, ConditionalHeader, PrimaryButton } from '../Components'

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
    // console.log(this.props);
  }
  handleClick(e) {
    let { result } = e.currentTarget.dataset;
    if(result === "edit") {
      this.props.handleSettingAcademy(e, this.state)
    } else if (result === "login") {
      this.props.handleModalStatus(this.state.academy_id)
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
      <ToyCodePaper>
        <DirectionContainer direction="column">
          <ConditionalHeader
            headerStyle="row_direction"
            headerTitle={name}
            headerIcon={'fa fa-university'}
            headerIconSize={'25px'}
            headerIconColor={'#468499'}
            headerIconMargin={'0.5em'}
            headerSecondTitle={phone}
            headerType="normal"
          >
            {
              this.props.customerType === "T"
                ? ""
                : (
                  <PrimaryButton
                    dataResult="edit"
                    content="수정"
                    onClick={this.handleClick}
                    purpose={'edit'}
                  />
                )
            }
            {
              this.props.customerType === "T"
                ? ""
                : (
                  <PrimaryButton
                    dataResult="delete"
                    content="삭제"
                    onClick={this.handleClick}
                    purpose={"delete"}
                  />
                )
            }
            <PrimaryButton
              dataResult="login"
              content="원 로그인 아이디"
              onClick={this.handleClick}
              purpose={"multi"}
            />
          </ConditionalHeader>
          <DirectionContainer direction="row">
            <TextWithLabel
              title={`담당자`}
              subContent={manager}
            />
            <TextWithLabel
              title={`담당자 전화번호`}
              subContent={managerPh}
            />
            <TextWithLabel
              title={`프로그램 사이트`}
              subContent={<a
                target="_blank"
                href={`https://www.toycode.org/code/${url}`}
                className="academy-card-link">
                {`toycode.org/code/${url}`}
              </a>}
            />
            <TextWithLabel
              title={`프로그램 언어`}
              subContent={languageOptions[lang]}
            />
          </DirectionContainer>
        </DirectionContainer>
      </ToyCodePaper>
    )
  }
}

export default SettingAcademyCard
