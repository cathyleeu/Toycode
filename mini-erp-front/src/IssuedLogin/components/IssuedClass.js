import React, {Component} from 'react'
import './IssuedClass.css'
import IssuedNames from './IssuedNames'


class IssuedClass extends Component {
  constructor(props){
    super(props)
    this.state = {
      added: false, // Boolean
      isEditing: true //for disabled textarea
    }
  }
  componentWillMount(){
    const {isFetchedNamesByClass, kclassId, kclassName} = this.props;
    isFetchedNamesByClass(kclassId, kclassName)
  }
  isPostingNames = () => {
    const {isRegisteredNames, kclassId, parentId, kinderId, kclassName, studentsNames } = this.props;
    const students = studentsNames[kclassName].students;
    isRegisteredNames(parentId,kinderId,kclassId,kclassName, students)
    this.setState({ isEditing: true, added: false })
  }
  isEditingNames = () => {
    const {isEditingNames, kclassId, kclassName, studentsNames } = this.props;
    const students = studentsNames[kclassName].students;
    isEditingNames(kclassId, students , kclassName)
    this.setState({ isEditing: false })
  }
  onChange = ( e:Event ) => {
    e.preventDefault()
    this.setState({ students: e.target.value })
  }
  render(){
    const { kinderName, kclassName, code, level, disabled, studentsNames } = this.props;
    let needNames = studentsNames.needNames;
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
            <input type="hidden" name="students" value={studentsNames[kclassName] ? studentsNames[kclassName].students : ''} />
            <button disabled={disabled} onClick={() => {
              return(alert('로그인 스티커를 인쇄하기 위해, 인쇄설정 및 라벨지를 확인하세요. \n아래의 확인을 클릭하시면, 로그인 발급페이지로 이동합니다.'))}}>로그인 스티커 발급</button>
          </form>
        </div>
        {(needNames && (needNames.map(item => item).indexOf(kclassName) !== -1))
          ? <div className="issued-login-top">
              {this.state.added
                ? (
                <div className="issued-login-top">
                  <button onClick={this.isPostingNames}>완료</button>
                  <button onClick={() => this.setState({ added: false })}>취소하기</button>
                </div>
                )
                : <button onClick={() => this.setState({ added: true, isEditing: false })}>학생 이름 등록하기</button>
               }
            </div>
          : <div>
              <div className="students-top">
                <p>학생들의 이름 혹은 별명(닉네임)을 한 줄에 하나씩 입력해주세요.</p>
                {this.state.isEditing
                  ? <button onClick={() => this.setState({isEditing: false})}>수정하기</button>
                  : <div>
                      <button onClick={this.isEditingNames}>수정완료</button>
                      <button onClick={() => this.setState({isEditing: true})}>취소</button>
                    </div>
                }
              </div>
              {studentsNames[kclassName]
                &&
                  <IssuedNames {...this.props}
                    disabled={this.state.isEditing}
                    studentsNames={studentsNames[kclassName].students.join("\n")}
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
