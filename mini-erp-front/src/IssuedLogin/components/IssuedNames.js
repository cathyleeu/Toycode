import React, {Component} from 'react'
import { splitNames } from '../../services/issue4login'
class IssuedNames extends Component {
  constructor(props){
    super(props)
    this.state = {
      students: props.studentsNames // names
    }
  }
  componentWillReceiveProps(props){
    this.setState({students: props.studentsNames})
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log("shouldProps",nextProps)
  //   console.log("shouldState",nextState)
  //   if (this.props.students === nextProps.studentsNames) return false;
  //   return true;
  // }
  onChange = (e) => {
    e.preventDefault()
    this.setState({ students: e.target.value })
  }
  isWritingNames4Issue = () => {
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
          onBlur={this.isWritingNames4Issue}
          value={this.state.students}
          disabled={disabled}
        />
      </div>
    )
  }
}

export default IssuedNames;
