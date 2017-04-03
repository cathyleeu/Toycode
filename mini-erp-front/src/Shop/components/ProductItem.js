import React, {PureComponent} from 'react'
import Product from './Product'



class ProductItem extends PureComponent {
  // constructor(props) {
  //   super(props)
  // }
  render(){
    const { book, onAddToCartClicked } = this.props;
    return(
      <div onClick={onAddToCartClicked} className="goods-list-ctx">
        <Product
          title={book.title}
          volume={book.volume}
          level={book.level}
          imgcode={book.imgcode}
          className={'listCard'}
        />
      </div>
    )
  }
}

// const ProductItem = ({book, onAddToCartClicked }) => (
//   <div onClick={onAddToCartClicked} className="goods-list-ctx">
//     <Product
//       title={book.title}
//       volume={book.volume}
//       level={book.level}
//       imgcode={book.imgcode}
//       className={'listCard'}
//     />
//   </div>
// )


export default ProductItem
