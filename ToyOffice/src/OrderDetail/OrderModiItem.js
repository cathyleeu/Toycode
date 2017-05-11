import React, {PureComponent} from 'react'


class OrderModiItem extends PureComponent {
  state = {
    qutt: this.props.qutt || 0
    // sales: this.props.sales || 0
  }
  handleChange = e => {
    let {isModiGoodsQutt, name} = this.props;
    this.setState({[e.target.name]: e.target.value})
    isModiGoodsQutt(name, parseInt(e.target.value, 10))
  }
  handleDelete = () => {
    let { isDeleteGoods, name } = this.props;
    if(confirm(`${name}을 삭제하시겠습니까?`)){
      isDeleteGoods(name)
    }
  }
  render(){
    return(
      <tr>
        <td>{this.props.name}</td>
        <td><input type="number" name="qutt" value={parseInt(this.props.qutt, 10)} min='1' onChange={this.handleChange}/></td>
        <td>{this.props.sales}</td>
        <td><button onClick={this.handleDelete}>DELETE</button></td>
      </tr>
    )
  }
}

export default OrderModiItem
