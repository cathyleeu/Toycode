import React, {Component} from 'react'
import './Goods.css'
import GoodsModal from './GoodsModal'

class Goods extends Component {
  constructor(props){
    super(props)
    this.state = {
      isModalOpen: 'none',
      imgcode: props.imgcode|| '',
      title: props.title|| '',
      volume: props.volume|| '',
      level: props.level|| '',
      desc: props.desc|| '',

    }
  }

  handleOpenModal = (block) => {
    this.setState({isModalOpen: block})
  }
  handleCloseModal = (none) => {
    this.setState({isModalOpen: none})
  }
  render(){
    const {imgcode, title, volume, level, desc } = this.state;
    let bookCover = require(`../../../public/img/${imgcode}.png`)
    return(
      <div className="Goods_box">
        <img src={bookCover} className="goods-cover" role="presentation"/>
        <div className="Goods_detail">
          <p>상품명: {title}{level}-{volume}</p>
          <p>설명: {desc}</p>
          <button onClick={() => this.handleOpenModal('block')}>수정하기</button>
        </div>
        <GoodsModal {...this.props}
          isModalOpen={this.state.isModalOpen}
          handleCloseModal={this.handleCloseModal}
        />
      </div>
    )
  }
}

export default Goods
