import React, {PureComponent} from 'react'


class KinderCardInput extends PureComponent{
  render(){
    return(
      <div className="KinderCard-Input">
        <p>{this.props.label}</p>
        <input value={this.props.value} disabled={this.props.modi}/>
      </div>
    )
  }
}

export default KinderCardInput
