import React, {PureComponent} from 'react'
import { splitNames } from '../../services/issue4login'
class IssuedNames extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      students: props.studentsNames // names
    }
  }
  componentWillReceiveProps(props){
    this.setState({students: props.studentsNames})
  }
  onChange = (e) => {
    e.preventDefault()
    console.log("IssuedNames");
    this.setState({ students: e.target.value })
  }
  handleCompletedEdit = () => {
    const { kclassId, isWritingNames } = this.props;
    const students = splitNames(this.state.students)
    isWritingNames(kclassId, students)
  }
  render(){
    const { disabled } = this.props;
    return(
      <div>
        <textarea
          className={disabled ? 'students-names names-disabled' : 'students-names'}
          onChange={this.onChange}
          onBlur={this.handleCompletedEdit}
          value={this.state.students}
          disabled={disabled}
        />
      </div>
    )
  }
}

export default IssuedNames;
