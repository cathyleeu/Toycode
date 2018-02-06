import React, {PureComponent} from 'react'
import './IssuedClass.css'
import IssuedNames from './IssuedNames'
import moment from 'moment-timezone'


class IssuedClass extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      added: false, // Boolean
      isEditing: true //for disabled textarea
    }
  }
  componentDidMount(){
    const {isFetchedNamesByClass, kclassId, kclassName} = this.props;
    isFetchedNamesByClass(kclassId, kclassName)
  }
  isPostingNames = () => {
    const {isRegisteredNames, kclassId, parentId, kinderId, kclassName, studentsNames } = this.props;
    const students = studentsNames[kclassId].students;
    isRegisteredNames(parentId,kinderId,kclassId,kclassName, students)
    this.setState({ isEditing: true, added: false })
  }
  isEditingNames = () => {
    const {isEditingNames, kclassId, kclassName, studentsNames } = this.props;
    const students = studentsNames[kclassId].students;
    isEditingNames(kclassId, students , kclassName)
    console.log("editing")
    this.setState({ isEditing: true })
  }
  onChange = ( e:Event ) => {
    e.preventDefault()
    this.setState({ students: e.target.value })
  }
  render(){
    const { kinderName, kclassName, kinderUrl, level, disabled, studentsNames, kinderLang, kclassId, kinderId, parentId } = this.props;
    // console.log("IssuedClass", this.props);
    let needNames = studentsNames.needNames;
    let mon = moment().set({year:2017, month:3});
    // YBM 대구지사 3월로 고정 예외처리
    if(kinderId.split("-")[0] === "C00071") {
      mon = moment().set({year:2017, month:2});
    }
    return(
      <div className='issued-login'>
        <div className="issued-login-top issued-kinder-info">
          <i className="fa fa-id-card" aria-hidden="true"></i>
          <p className="issued-info">{kinderName} - {kclassName}</p>
          <form action="https://toycode.org/issue" method="POST" target="_blank">
            <input type="hidden" name="code" value={kinderUrl} />
            <input type="hidden" name="school" value={kinderName} />
            <input type="hidden" name="lang" value={kinderLang} />
            <input type="hidden" name="className" value={kclassName} />
            <input type="hidden" name="yearmonth" value={mon.format('YYYYMM')} />
            <input type="hidden" name="level" value={level} />
            <input type="hidden" name="students" value={studentsNames[kclassId] ? studentsNames[kclassId].students : ''} />
            <button
              className='button-edit'
              disabled={disabled} onClick={() => {
              return(alert('로그인 스티커를 인쇄하기 위해, 인쇄설정 및 라벨지를 확인하세요. \n아래의 확인을 클릭하시면, 로그인 발급페이지로 이동합니다.'))}}>로그인발급</button>
          </form>
           {/* || kinderId.split("-")[0] === "C00071" */}
          {(kinderId.split("-")[0] === "C00043")
            ? <form action="http://localhost:3000/reports" target="_blank">
                <input type="hidden" name="code" value={kinderUrl} />
                <input type="hidden" name="classId" value={kclassId} />
                <input type="hidden" name="academyId" value={kinderId} />
                <input type="hidden" name="parentId" value={parentId} />
                <input type="hidden" name="school" value={kinderName} />
                <input type="hidden" name="className" value={kclassName} />
                <input type="hidden" name="level" value={level} />
                <input type="hidden" name="students" value={studentsNames[kclassId] ? studentsNames[kclassId].students : ''} />
                <button
                  className='button-edit'>
                  이력관리 리포트
                </button>
              </form>
            : false
          }

        </div>
        {(needNames && (needNames.indexOf(kclassId) !== -1))
          ? <div className="issued-login-top">
              {this.state.added
                ? (
                <div className="issued-login-top">
                  <p>학생들의 이름 혹은 별명(닉네임)을 한 줄에 하나씩 입력해주세요.</p>
                  <button
                    className='button-save'
                    onClick={this.isPostingNames}>완료</button>
                  <button
                    className='button-cancle'
                    onClick={() => this.setState({ added: false })}>취소하기</button>
                </div>
                )
                : <button
                    className='button-addClass register_names'
                    onClick={() => this.setState({ added: true, isEditing: false })}>학생 이름 등록하기</button>
               }
            </div>
          : <div>
              <div className="students-top">
                <p>학생들의 이름 혹은 별명(닉네임)을 한 줄에 하나씩 입력해주세요.</p>
                {this.state.isEditing
                  ? <button
                      className='button-addClass'
                      onClick={() => this.setState({isEditing: false})}>수정하기</button>
                  : <div className="students-top">
                      <button
                        className='button-save'
                        onClick={this.isEditingNames}>수정완료</button>
                      <button
                        className='button-cancle'
                        onClick={() => this.setState({isEditing: true})}>취소</button>
                    </div>
                }
              </div>
              {studentsNames[kclassId]
                &&
                  <IssuedNames {...this.props}
                    disabled={this.state.isEditing}
                    studentsNames={studentsNames[kclassId].students.join("\n")}
                  />}
            </div>
        }
        {this.state.added
          && <IssuedNames
              {...this.props}
              studentsNames={''}
              disabled={this.state.isEditing}/> }
      </div>
    )
  }
}

export default IssuedClass;
