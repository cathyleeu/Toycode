import React, {Component} from 'react'
import './IssuedClass.css'
import IssuedNames from './IssuedNames'


class IssuedClass extends Component {
  constructor(props){
    super(props)
    this.state = {
      addNick: '' // Boolean
    }
  }
  componentWillMount(){
    const {isFetchedNamesByClass, kclassId} = this.props;
    isFetchedNamesByClass(kclassId)
  }
  onChange = ( e:Event ) => {
    e.preventDefault()
    this.setState({ students: e.target.value })
  }
  render(){
    const { kinderName, kclassName, code, level, disabled, studentsNames, isRegisteredNames, kclassId, parentId, kinderId, isEditingNames } = this.props;
    return(
      <div style={{margin: '2em 0'}}>
        {kinderName} - {kclassName}
        <button onClick={() => this.setState({ addNick: true })} style={{display:'none'}}>학생 이름 등록하기</button>
        {this.state.addNick && (
          <div>
            <IssuedNames
              isRegisteredNames={isRegisteredNames}
              isEditingNames={isEditingNames}
              kclassId={kclassId}
              studentsNames={studentsNames[kclassName] ? studentsNames[kclassName].students.join("\n") : ''}
              parentId={parentId}
              kinderId={kinderId}
              kclassName={kclassName}
            />
            <button onClick={() => this.setState({ addNick: false }) }>취소하기</button>
          </div>
        )}
        <form action="https://toycode.org/issue" method="POST" target="_blank">
          <input type="hidden" name="code" value={code} />
          <input type="hidden" name="school" value={kinderName} />
          <input type="hidden" name="className" value={kclassName} />
          <input type="hidden" name="yearmonth" value="201703" />
          <input type="hidden" name="level" value={level} />
          <button disabled={disabled} onClick={() => alert('로그인 스티커를 인쇄하기 위해, 인쇄설정 및 라벨지를 확인하세요. \n아래의 확인을 클릭하시면, 로그인 발급페이지로 이동합니다.')}>로그인 스티커 발급 및 인쇄</button>
        </form>
      </div>
    )
  }
}

export default IssuedClass;
