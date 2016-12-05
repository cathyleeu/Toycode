import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
// import axios from 'axios'
//
// const ROOT_URL = 'http://localhost:3090'
// const books = axios.get(ROOT_URL+'/books').then(response => {
//   debugger
//     response.data.map((book) => {
//       console.log(book)
//       return (
//         <div className="card card-block">
//           <h4 className="card-titld">{book.title}</h4>
//           <p className="card-text">{book.quantity}</p>
//           <p className="card-text">{book.price}</p>
//           <p className="card-text">{book.desc}</p>
//         </div>
//       )
//     })
//   })

class OrderList extends Component{
  constructor(props){
    super(props)
    // isOrder = this.isOrder.bind(this)
  }
  componentWillMount(){
    this.props.fetchBooks()
  }
  // chooseBook(book){
  //   console.log(book.title);
  // }
  renderBooks(book) {
    return (
      <div className="listCard" key={book.id}>
          <h4 className="card-titld">상품명: {book.title}</h4>
        {/*
          일단 주석처리
          <img src={book.img} className="product_img"/>

          <p className="card-text">수량: {book.quantity}</p>
          <p className="card-text">가격: {book.price}</p>
          <p className="card-text">설명: {book.desc}</p>
        */}

      </div>
    )
  }
  render() {
    return (
      <div className="orderList">
        {this.props.books.map(this.renderBooks)}
      </div>
    )
  }
}


function mapStateToProps(state){
  return {books: state.books}
}


// {* {this.props.books.map(this.renderBooks)} *}
export default connect(mapStateToProps, actions)(OrderList)

// export default OrderList
