import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import {Goods} from '../components'


class CatalogContainer extends Component {
  state = {
    goods: this.props.goods
  }
  componentWillReceiveProps(newProps){
    if(newProps.goods !== this.state.goods){
      this.setState({goods: newProps.goods})
    }
    console.log("newProps", this.state.goods)
  }
  childGoods = (g, i) => {
    return <Goods {...g} key={i} {...this.props}/>
  }
  render(){
    if(!this.state.goods){
      return(
        <div>
          <p>데이터 불러오는 중</p>
        </div>
      )
    }
    return(
      <div className="has-Header Container">
        <button>상품등록</button>
        <div className="Catalog">
        {this.state.goods.map(this.childGoods)}
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  goods: state.shop.products
})

export default connect(mapStateToProps, actions)(CatalogContainer)
