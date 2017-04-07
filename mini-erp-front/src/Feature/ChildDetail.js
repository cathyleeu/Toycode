import React, {PureComponent} from 'react'


//
class ChildDetail extends PureComponent {
  render(){
    const {g} = this.props;
    return(
      <div>
        <p>{g.name} {g.qutt} {g.sales}</p>
      </div>
    )
  }
}


export default ChildDetail
