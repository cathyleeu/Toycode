import React, { PureComponent } from 'react'
import './AddedProducts.css'

class AddedProduct extends PureComponent {
  constructor(props) {
    super(props)
    this.state={
      qutt: props.book.amount
    }
  }
  handleChange = (e) => {
    this.setState({qutt: e.target.value})
  }
  isOnBlur = () => {
    const {goodsSelect, book} = this.props
    if(!this.state.qutt){
      alert('수량을 입력하세요.')
    } else {
      goodsSelect(book.id, parseInt(this.state.qutt, 10))
    }
  }
  render(){
    const {book} = this.props;
    return(
      <div className="Added" key={book.id}>
        <div className="col-md-3">
          <p>{book.title} {book.level}레벨 {book.volume}권 </p>
        </div>
        <input
          className='col-md-6 Added-Input'
          type='number'
          value={this.state.qutt}
          placeholder='주문수량'
          onChange={this.handleChange}
          onBlur={this.isOnBlur}
          min='0'
        />
        <button
          className="col-md-2"
          onClick={() => this.props.isDelete(book.id)}>삭제</button>
      </div>
    )
  }
}


export default AddedProduct
