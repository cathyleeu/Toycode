import React, {PureComponent} from 'react'


class Product extends PureComponent {
  render(){
    let {imgcode, className, title, volume, level} = this.props;
    let hookName = {
      "A특별1" : "ASP1",
      "B특별1" : "BSP1",
      "C특별1" : "CSP1"
    }
    imgcode = hookName[imgcode] || imgcode ;
    if(volume === "SP1") {
      volume = "특별(상)"
    }
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
