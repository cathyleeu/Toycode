import React, {Component} from 'react';



class KinderClass extends Component {
  constructor(props){
    super(props)
    this.state = {
      classname: '',
      students: 0
    }
    this.isHandleChange = this.isHandleChange.bind(this)
  }
  isHandleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    },() => console.log(this.state))
  }
  render(){
    return(
        <div className="row col-md-12">
          <label>반 이름</label>
          <input
            type="text"
            name='classname'
            value={this.state.classname}
            onChange={this.isHandleChange}
          />
          <label>학생 수</label>
          <input
            type="number"
            name='students'
            value={this.state.students}
            onChange={this.isHandleChange}
          />
        </div>
    )
  }
}


//
// const KinderClass = () => (
//   <div className="row col-md-12">
//     <label>반 이름</label>
//     <input
//       type="text"
//     />
//     <label>학생 수</label>
//     <input
//       type="number"
//     />
//   </div>
// )

export default KinderClass
