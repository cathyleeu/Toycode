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



//
// const Product = (props) => {
//
//   return(
//   <div className={props.className}>
//     {console.log(props.imgcode)}
//     <img src={bookCover} className="goods-cover" role="presentation"/>
//     <p>{props.title}-{props.volume}권 {props.level}레벨</p>
//   </div>
// )}

export default Product



// import logo from '../../public/logo.png'
