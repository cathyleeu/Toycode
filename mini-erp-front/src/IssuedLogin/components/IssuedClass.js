import React, {Component} from 'react'
import './IssuedClass.css'


// const IssuedClass = ({ kinderName, kclassName, code, level, disabled }) => {
//   // const disabled = level === 'none' ? 'disabled' : '';
//   console.log(level);
//   return(
//   <div>
//     {kinderName} - {kclassName}
//     <form action="https://toycode.org/issue" method="POST" target="_blank">
//       <input type="hidden" name="code" value={code} />
//       <input type="hidden" name="school" value={kinderName} />
//       <input type="hidden" name="className" value={kclassName} />
//       <input type="hidden" name="yearmonth" value="201703" />
//       <input type="hidden" name="level" value={level} />
//       <button disabled={disabled} onClick={() => alert('로그인 스티커를 인쇄하기 위해, 인쇄설정 및 라벨지를 확인하세요. \n아래의 확인을 클릭하시면, 로그인 발급페이지로 이동합니다.')}>로그인 스티커 발급 및 인쇄</button>
//     </form>
//     <button onClick={() => this.setState({ }) }>
//
//     </button>
//   </div>
// )}


class IssuedClass extends Component {
  constructor(props){
    super(props)
    this.state = {
      addNick: '', // Boolean
      students:'' // names
    }
  }
  onChange = ( e:Event ) => {
    e.preventDefault()
    this.setState({ students: e.target.value })
  }
  isPostingNames = () => {
    const {isRegisteredNames, kclassId, parentId, kinderId, kclassName } = this.props;
    const names = this.state.students.split("\n").map(function(name) {return name.trim()}).filter(function(name) {return name})
    isRegisteredNames(parentId,kinderId,kclassId,kclassName,names)
  }
  render(){
    const { kinderName, kclassName, code, level, disabled } = this.props;
    return(
      <div>
        {kinderName} - {kclassName}
        <button onClick={() => this.setState({ addNick: true })} style={{display:'none'}}>학생 이름 등록하기</button>
        {this.state.addNick && (
          <div>
            학생들의 이름 혹은 별명(닉네임)을 한 줄에 하나씩 입력해주세요.
            <textarea className='students-names' onChange={this.onChange} />
            <button onClick={() => this.setState({ addNick: false }) }>취소하기</button>
            <button onClick={this.isPostingNames}>완료</button>
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
