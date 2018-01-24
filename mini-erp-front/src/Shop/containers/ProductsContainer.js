import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addToCartUnsafe } from '../actions/cart'
import { getAddedCart } from '../reducers/cart'
import {ProductsList, ProductItem} from '../components'




class ProductsContainer extends Component{
  state = {
    selectedVol: "1",
    goods: this.props.books
  }
  componentWillReceiveProps(newProps){
    this.setState({goods: newProps.books})
  }
  render(){
    const { selected, addToCartUnsafe, customType } = this.props;
    let volume = ["1", "2", "3", "4", "5", "특별(상)", "6", "7", "8", "9", "10", "특별(하)"],
        filterGoods = this.state.goods.filter(g => {
          if(g.volume === "특별1") {
            g.volume = "SP1"
          }
          return g.volume === this.state.selectedVol
        })
    return(
      <ProductsList title="1단계: 주문하실 교재를 선택하세요.">
        <div className="goods-list-cont">
          <div className="goods-list" style={{marginBottom:10 }}>
            {volume.map((v,i) => {
              return(
                  <button className="button-addClass"
                          style={{marginRight: 10}}
                          key={i} onClick={() => {
                            if(v === "특별(상)") {
                              v = 'SP1'
                            }
                            this.setState({selectedVol: v})
                          }}>
                      {v}권
                  </button>
              )
            })}
          </div>
          <div className="goods-list">
            {filterGoods.map((book, i) =>
              <ProductItem
                key={i}
                book={book}
                onAddToCartClicked={() => {
                  selected.map((Id) => Id.id).indexOf(book.code) === -1 &&
                    addToCartUnsafe(book, customType === "A" ? book.bPrice : book.dPrice)
                }}
              />
            )}
          </div>
        </div>
      </ProductsList>
    )
  }
}


const mapStateToProps = (state) => ({
  books: state.shop.products,
  selected: getAddedCart(state),
  customType: state.auth.user.customerType
})

export default connect(mapStateToProps, { addToCartUnsafe })(ProductsContainer)
