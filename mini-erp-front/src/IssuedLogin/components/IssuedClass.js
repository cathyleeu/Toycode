import React, {Component} from 'react'
import './IssuedClass.css'
import IssuedNames from './IssuedNames'


class IssuedClass extends Component {
  constructor(props){
    super(props)
    this.state = {
      addNick: '', // Boolean
      isEdited: true
    }
  }
  componentWillMount(){
    const {isFetchedNamesByClass, kclassId} = this.props;
    isFetchedNamesByClass(kclassId)
  }
  isPostingNames = () => {
    const {isRegisteredNames, kclassId, parentId, kinderId, kclassName, studentsNames } = this.props;
    const students = studentsNames[kclassName].students;
    isRegisteredNames(parentId,kinderId,kclassId,kclassName, students)
    this.setState({ isEdited: true })
  }
  isEditingNames = () => {
    const {isEditingNames, kclassId, kclassName, studentsNames } = this.props;
    const students = studentsNames[kclassName].students;
    isEditingNames(kclassId, students , kclassName)
    this.setState({ isEdited: true })
  }
  onChange = ( e:Event ) => {
    e.preventDefault()
    this.setState({ students: e.target.value })
  }
  render(){
    const { kinderName, kclassName, isWritingNames, code, level, disabled, studentsNames, kclassId, parentId, kinderId } = this.props;
    return(
      <div className='issued-login'>
        <div className="issued-login-top">
          <p>{kinderName} - {kclassName}</p>
          <form action="https://toycode.org/issue" method="POST" target="_blank">
            <input type="hidden" name="code" value={code} />
            <input type="hidden" name="school" value={kinderName} />
            <input type="hidden" name="className" value={kclassName} />
            <input type="hidden" name="yearmonth" value="201703" />
            <input type="hidden" name="level" value={level} />
            {/* <input type="hidden" name="students" value={studentsNames[kclassName]} /> */}
            <button disabled={disabled} onClick={() => alert('로그인 스티커를 인쇄하기 위해, 인쇄설정 및 라벨지를 확인하세요. \n아래의 확인을 클릭하시면, 로그인 발급페이지로 이동합니다.')}>로그인 스티커 발급</button>
          </form>
        </div>

        {(studentsNames[kclassName] || this.state.addNick) ? (
          <div style={{display:'none'}}>
            <div className="students-top">
              <p>학생들의 이름 혹은 별명(닉네임)을 한 줄에 하나씩 입력해주세요.</p>
              { studentsNames[kclassName]
                ? (this.state.isEdited
                    ? <button onClick={() => this.setState({ isEdited: false })}>수정하기</button>
                    : <button onClick={this.isEditingNames}>수정완료</button>)
                : <button onClick={this.isPostingNames}>완료</button> }
            </div>
            <IssuedNames
              kclassId={kclassId}
              isWritingNames={isWritingNames}
              studentsNames={studentsNames[kclassName] ? studentsNames[kclassName].students.join("\n") : ''}
              parentId={parentId}
              kinderId={kinderId}
              disabled={this.state.isEdited}
              kclassName={kclassName}
            />
            { studentsNames[kclassName] ? '' : <button onClick={() => this.setState({ addNick: false })}>취소하기</button> }
          </div>
        ) : ( <button onClick={() => this.setState({ addNick: true, isEdited: false })} style={{display:'none'}}>학생 이름 등록하기</button> ) }
      </div>
    )
  }
}

export default IssuedClass;
