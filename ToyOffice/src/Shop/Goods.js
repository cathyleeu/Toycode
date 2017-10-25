import React from 'react'
import { ToyCodeButton } from '../Components'

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
    let bookCover = `../../public/goods/${lang}/${g.imgcode}.png`
    // console.log(bookCover);
    return(
      <div className="Goods-cont">
        <img src={bookCover} className="Goods-cover" alt={`${g.title} ${g.level}`}/>
        <div className="Goods-ctx-cont">
          <p className="Goods-title">{g.title}{g.level}{g.volume}</p>
          <p className="Goods-desc">{g.desc}</p>
          <p className="Goods-fixed-price">정가 : {g.dPrice}</p>
          <p className="Goods-sales-price">판매가 : {g.dPrice*0.6}</p>
          <ToyCodeButton handleButtonEvent={this.handleSelectGoods} content={'장바구니 담기'}/>
        </div>
      </div>
    )
  }
}


export default Goods
