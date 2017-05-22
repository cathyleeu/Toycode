import React, {Component} from 'react'
import GoodsCartDetail from './GoodsCartDetail'


class GoodsCartList extends Component{
  render(){
    let cardDetail = this.props.goodsInCart.map((s,i) => <GoodsCartDetail key={i} s={s} {...this.props}/>)
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
          {cardDetail}
          </tbody>
        </table>
      </div>
    )
  }
}


export default GoodsCartList
