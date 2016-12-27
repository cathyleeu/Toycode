import React, {Component} from 'react'
import KinderClass from './KinderClass'



class Kinder extends Component {
  constructor(props){
    super(props)
    this.state = {
      classes: ['0']
    }
  }
  appendClass() {
    const newClass = `${this.state.classes.length}`;
    this.setState({ classes: this.state.classes.concat([newClass]) });
  }
  render(){
    // const {appendClass, StateInput} = this.props
    return(
      <div className="row">
        <div className="col-md-4">
          <label>원 명</label>
          <input
            type="text"
          />
          <button className="btn btn-danger" onClick={() => this.appendClass()}>반 추가</button>
        </div>

        {/* TODO: 유치원반 추가 버튼  */}
        <div className="col-md-8">
          <div>
            {this.state.classes.map(ban => <KinderClass key={ban} />)}
          </div>
        </div>
        <hr className="col-md-12" />
      </div>
    )
  }
}

// const Kinder = ({appendClass, StateInput}) => (
//   <div className="row col-md-12">
//     <div className="row col-md-4">
//       <label>유치원</label>
//       <input
//         type="text"
//       />
//     </div>
//
//     {/* TODO: 유치원반 추가 버튼  */}
//     <div className="col-md-8">
//       <button className="btn btn-danger" onClick={() => appendClass()}>반 추가</button>
//       <div>
//         {StateInput.map(ban => <KinderClass key={ban} />)}
//       </div>
//     </div>
//   </div>
// )

export default Kinder
