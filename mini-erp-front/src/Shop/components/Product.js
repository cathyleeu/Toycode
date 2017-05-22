import React, {PureComponent} from 'react'


class Product extends PureComponent {
  render(){
    const {imgcode, className, title, volume, level} = this.props;
    let bookCover = require(`../../../public/img/${imgcode}.png`)
    return(
      <div className={className}>
        <img src={bookCover} className="goods-cover" role="presentation"/>
        <p>{title}-{volume}권 {level}레벨</p>
      </div>
    )
  }
}


export default Product
