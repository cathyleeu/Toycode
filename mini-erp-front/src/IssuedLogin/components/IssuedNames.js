import React, {Component} from 'react'

class IssuedNames extends Component {
  constructor(props){
    super(props)
    this.state = {
      students: props.studentsNames // names
    }
  }
  onChange = ( e:Event ) => {
    e.preventDefault()
    this.setState({ students: e.target.value })
  }
  isPostingNames = () => {
    const {isRegisteredNames, kclassId, parentId, kinderId, kclassName } = this.props;
    const names = this.state.students.split("\n").map(name => name.trim()).filter(name => name)
    isRegisteredNames(parentId,kinderId,kclassId,kclassName,names)
  }
  isEditingNames = () => {
    const {isEditingNames, kclassId, kclassName } = this.props;
    const names = this.state.students.split("\n").map(name => name.trim()).filter(name => name)
    isEditingNames(kclassId, names, kclassName)
  }
  render(){
    const { studentsNames } = this.props;
    return(
      <div>
        <div className="students-top">
          <p>학생들의 이름 혹은 별명(닉네임)을 한 줄에 하나씩 입력해주세요.</p>
          { studentsNames ? <button onClick={this.isEditingNames}>수정</button> : <button onClick={this.isPostingNames}>완료</button> }
        </div>
        <textarea className='students-names' onChange={this.onChange} value={this.state.students} />
      </div>
    )
  }
}

export default IssuedNames;
