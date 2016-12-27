import React, {Component} from 'react';
import Kinder from './Kinder'


class Branch extends Component {
  constructor(props){
    super(props)
    this.state = {
      classes: ['0'],
      kinder: ['0']
    }
  }
  // appendClass() {
  //   const newClass = `${this.state.classes.length}`;
  //   this.setState({ classes: this.state.classes.concat([newClass]) });
  // }
  appendKinder(){
    const newKinder = `${this.state.kinder.length}`;
    this.setState({ kinder: this.state.kinder.concat([newKinder]) });
  }
  render(){
    return(
      <div className="row">
        <div className="row col-md-12">
          <h5 className="col-md-11"> 지사 소속 유치원 리스트 </h5>
          <button
            className="col-md-1 btn btn-danger"
            onClick={() => this.appendKinder()}>원 추가</button>
        </div>
        {this.state.kinder.map(kin => <Kinder
            key={kin}
            // appendClass={this.appendClass}
            StateInput={this.state.classes}
         />)}
      </div>
    )
  }
}



export default Branch
