import React from 'react'
import Goods from './Goods'

class GoodsList extends React.Component{
  renderBook = (g, i) => <Goods g={g} key={i} {...this.props}/>
  render(){
    return(
      <div className="Goods-List">
        {this.props.goods.map(this.renderBook)}
      </div>
    )
  }
}


export default GoodsList
