import React, {Component} from 'react'
import GoodsCartDetail from './GoodsCartDetail'


class GoodsCartList extends Component{
  renderCartDetail = (s,i) => <GoodsCartDetail key={i} s={s} {...this.props}/>
  render(){
    return(
      <div>
        <table className="Select-Goods-List">
          <thead>
            <tr className="Select-Goods-Title">
              <th className="lang">언어</th>
              <th className="title">상품명</th>
              <th className="level">레벨</th>
              <th className="volume">호</th>
              <th className="order">수량</th>
            </tr>
          </thead>
          <tbody>
          {this.props.goodsInCart.map(this.renderCartDetail)}
          </tbody>
        </table>
        <div className="Select-Goods-Statement">

        </div>
      </div>
    )
  }
}


export default GoodsCartList
