import React, {Component} from 'react'



class GoodsModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      erpCode: props.erpCode || '',
      title: props.title|| '',
      volume: props.volume|| '',
      level: props.level|| '',
      desc: props.desc|| '',
      qutt: props.qutt|| ''
    }
  }
  handleChange = (e) => {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }
  handleModifyingGoods = () => {
    this.props.handleCloseModal('none')
    this.props.ModifyingGoods(this.state, this.props.code)
  }
  render(){
    const {title, volume, level, desc, qutt, erpCode} = this.state;
    return(
      <div style={{display: this.props.isModalOpen }} className="outerStyle">
        <div className="overlay"></div>
        <div className="searchModal Goods_Modal">
          <div className='class_row'>
            <div></div>
            <p>상품수정</p>
            <button onClick={() => this.props.handleCloseModal('none')}>닫기</button>
          </div>
          <div className='class_column'>
            <label>상품명: <input value={title} name='title' onChange={this.handleChange} /> </label>
            <label>레벨: <input value={level} name='level' onChange={this.handleChange} /> </label>
            <label>호:
              <input value={volume} name='volume' onChange={this.handleChange}/>
            </label>
            <label>ERP_CODE:
              <input value={erpCode} name='erpCode' onChange={this.handleChange}/>
            </label>
            <label>설명:
              <input value={desc} name='desc' onChange={this.handleChange} />
            </label>
            <label>수량:
              <input value={qutt} name='qutt' onChange={this.handleChange}/>
            </label>
          </div>
          <button onClick={this.handleModifyingGoods}>수정완료</button>
        </div>
      </div>
    )
  }
}

export default GoodsModal;
