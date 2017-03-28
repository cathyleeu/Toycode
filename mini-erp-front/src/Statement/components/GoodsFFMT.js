import React,{Component} from 'react'


class GoodsFFMT extends Component {
  render(){
    return (
      <div>
        {this.props.goodsFFMT.map((goods,i) => (
            <div key={i} className="statement-item">
              <p>{this.props.ffmt.userName}</p>
              <p>{goods.name}</p>
              <p>{goods.qutt}</p>
              <p>{goods.sales/goods.qutt}</p>
              <p>{goods.sales}</p>
            </div>
          ))}
      </div>
    )
  }
}

export default GoodsFFMT
