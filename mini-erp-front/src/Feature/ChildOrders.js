import React, {PureComponent} from 'react'
import ChildDetail from './ChildDetail'

//
class ChildOrders extends PureComponent {
  ChildDetail = (g, i) => <ChildDetail g={g} key={i}/>
  render(){
    return(
      <div className='cst-container'>
        <div className='IV-Goods'>
          <div>
            {this.props.rqt.userName}
            {this.props.rqt.requestedGoods.map(this.ChildDetail)}
          </div>
        </div>
      </div>
    )
  }
}



export default ChildOrders
