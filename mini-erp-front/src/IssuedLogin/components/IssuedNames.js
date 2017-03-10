import React, {Component} from 'react'
import { splitNames } from '../../services/issue4login'
class IssuedNames extends Component {
  constructor(props){
    super(props)
    this.state = {
      students: props.studentsNames // names
    }
  }
  onChange = (e) => {
    e.preventDefault()
    this.setState({ students: e.target.value })
  }
  isWritingNames4Issue = () => {
    const { kclassName, isWritingNames } = this.props;
    const students = splitNames(this.state.students)
    isWritingNames(kclassName, students)
  }
  render(){
    const { disabled } = this.props;
    return(
      <div>
        <textarea
          className='students-names'
          onChange={this.onChange}
          onBlur={this.isWritingNames4Issue}
          value={this.state.students}
          disabled={disabled}
        />
      </div>
    )
  }
}

export default IssuedNames;
