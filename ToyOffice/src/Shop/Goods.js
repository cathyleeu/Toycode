import React from 'react'


class Goods extends React.Component{
  handleSelectGoods = () => {
    let addedCart = this.props.selected.map((Id) => Id.code).indexOf(this.props.g.code)
    if(addedCart === -1){
      this.props.addToCartUnsafe(this.props.g)
    } else {
      alert("이미 담긴 상품입니다.")
    }
  }
  render(){
    const {g, lang} = this.props;
    let bookCover = require(`../../public/goods/${lang}/${g.imgcode}.png`)
    return(
      <div className="Goods-cont">
        <img src={bookCover} className="Goods-cover" alt="presentation"/>
        <div className="Goods-ctx-cont">
          <p className="Goods-title">{g.title}{g.level}{g.volume}</p>
          <p className="Goods-desc">{g.desc}</p>
          <p className="Goods-price">소비자가 : {g.dPrice}</p>
          <button onClick={this.handleSelectGoods}>장바구니 담기</button>
        </div>
      </div>
    )
  }
}


export default Goods
